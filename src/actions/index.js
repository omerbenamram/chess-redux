import * as actionTypes from '../constants/actionTypes'

export const cellClicked = (placement, pieceType) => ({
  type: actionTypes.CELL_CLICKED,
  pieceType,
  placement
});

export const changeSelectedPiece = (placement, pieceType) => ({
  type: actionTypes.CELL_CLICKED,
  pieceType,
  placement
});

