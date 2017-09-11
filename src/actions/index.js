import * as actionTypes from '../constants/actionTypes'

export const cellClicked = (placement) => ({
    type: actionTypes.CELL_CLICKED,
    placement
});

export const selectedPiece = (placement) => ({
    type: actionTypes.SELECTED_PIECE,
    placement
});

export const calculatePath = (placement, pieces) => ({
    type: actionTypes.CALCULATE_PATH,
    placement,
    pieces,
});

export const pieceMoved = (newPlacement, oldPlacement) =>({
    type: actionTypes.PIECE_MOVED,
    newPlacement,
    oldPlacement
});
export const pieceTryEat = (newPlacement, oldPlacement) =>({
    type: actionTypes.PIECE_TRY_EAT,
    newPlacement,
    oldPlacement
});
export const switchTurn = () =>({
    type: actionTypes.SWITCH_TURN,

});
export const turnEnd = (selected) =>({
    type: actionTypes.TURN_ENDED,
    selected
});


export const isChecked = () =>({
    type: actionTypes.IS_CHECK,

});
export const getChecked = (color) =>({
    type: actionTypes.GET_CHECKED,
    color
});

export const check = (color, pieces) =>({
    type: actionTypes.CHECK,
    color,
    pieces
});

export const resetCheck = () =>({
    type:actionTypes.RESET_CHECK
});
export const isEndGame = () => ({
    type:actionTypes.IS_END_GAME,
});
export const isCheckmate = (color) => ({
    type:actionTypes.IS_CHECKMATE,
    color,
});