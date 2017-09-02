import * as actionTypes from './constants/actionTypes'
import {selectedPiece, calculatePath, pieceMoved, pieceTryEat, switchTurn} from "./actions/index";
import {findKey} from 'lodash'

export const chessMiddleware = store => next => action => {
  let state = store.getState();

  switch (action.type) {
    case actionTypes.CELL_CLICKED:
      if (state.board.pieces[action.placement].type !== undefined && state.board.pieces[action.placement].color === state.turn) {
        store.dispatch(selectedPiece(action.placement));
        store.dispatch(calculatePath(action.placement, state.board.pieces));
      }
      if (findKey(state.board.pieces, (piece) => {return piece.selected}) !== undefined) {
          let oldPlacement = findKey(state.board.pieces, (piece) => {return piece.selected});
          if(isPieceAtNewPlacement(state.board.pieces[action.placement])){
              store.dispatch(pieceTryEat(action.placement, oldPlacement))
          }
          else {
              store.dispatch(pieceMoved(action.placement, oldPlacement))
          }
          console.log(findKey(state.board.pieces, (piece) => {return piece.selected}))
          store.dispatch(switchTurn(findKey(state.board.pieces, (piece) => {return piece.selected})=== undefined))
      }

      return next(action);

    default:
      return next(action);
  }
};


const isPieceAtNewPlacement = (newPlacementPiece) =>
{
  return (newPlacementPiece.type !== null)
};
