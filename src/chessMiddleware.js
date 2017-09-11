import * as actionTypes from './constants/actionTypes'
import {
    selectedPiece, calculatePath, pieceMoved, pieceTryEat, switchTurn, turnEnd, check, isChecked, getChecked,
    resetCheck, isEndGame, isCheckmate
} from "./actions/index";
import {findKey} from 'lodash'

export const chessMiddleware = store => next => action => {
    let state = store.getState();

    switch (action.type) {
        case actionTypes.CELL_CLICKED:
            if(!state.board.checkmate){
                if (state.board.pieces[action.placement].type !== undefined && state.board.pieces[action.placement].color === state.turn) {
                    store.dispatch(selectedPiece(action.placement));
                    store.dispatch(calculatePath(action.placement, state.board.pieces));
                    store.dispatch(getChecked(state.turn));
                }
                if (findKey(state.board.pieces, (piece) => {return piece.selected}) !== undefined) {

                    let selectedPlacement = findKey(state.board.pieces, (piece) => {return piece.selected});
                    if(isPieceAtNewPlacement(state.board.pieces[action.placement])){
                        store.dispatch(pieceTryEat(action.placement, selectedPlacement));
                        if(state.board.checked === state.turn){
                            store.dispatch(resetCheck());
                        }
                    }
                    else {
                        store.dispatch(pieceMoved(action.placement, selectedPlacement));
                        if(state.board.checked === state.turn){
                            store.dispatch(resetCheck());
                        }
                    }
                    store.dispatch(switchTurn())
                }
            }
            return next(action);

        case actionTypes.SWITCH_TURN:
            if(state.board.checked === null){
                store.dispatch(turnEnd(findKey(state.board.pieces, (piece) => {return piece.selected}) === undefined));
                store.dispatch(isChecked());
            }
            else{
                console.log('GOTTA GET OUT OF CHECK')
            }
            return next(action);

        case actionTypes.IS_CHECK:
            store.dispatch(check(state.turn, state.board.pieces));
            store.dispatch(isEndGame());
            return next(action);

        case actionTypes.IS_END_GAME:
            if(state.board.checked === state.turn)
            {
             store.dispatch(isCheckmate(state.turn));
            }
            //check here for stale mate 
            return next(action);

        default:
            return next(action);
    }
};


const isPieceAtNewPlacement = (newPlacementPiece) =>
{
    return (newPlacementPiece.type !== null)
};
