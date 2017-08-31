import * as actionTypes from './constants/actionTypes'
import {CHANGED_SELECTED_PIECE} from "./constants/actionTypes";
import {changeSelectedPiece} from "./actions/index";

export const chessMiddleware = store => next => action => {
  let state = store.getState();

  switch (action.type) {
    case actionTypes.CELL_CLICKED:
      if (state.selected !== '' && action.pieceType.type !== undefined && action.pieceType.color === state.turn) {
        store.dispatch(changeSelectedPiece(action.pieceType, action.placement))
      }

      if (state.selected === '' && action.pieceType.type !== undefined && action.pieceType.color === state.turn) {
        store.dispatch()
      }

      if (state.selected !== '' && state.selected.pieceType.type !== undefined) {
        store.dispatch()
      }
      return next(action);

    default:
      return next(action)
  }
};
