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
export const switchTurn = (isSelected) =>({
  type: actionTypes.SWITCH_TURN,
  isSelected
});