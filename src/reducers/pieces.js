import * as actionTypes from "../constants/actionTypes";

const initPiecesPlacement = {
  'A8': {type: 'Rook', color: 'B'},
  'B8': {type: 'Knight', color: 'B'},
  'C8': {type: 'Bishop', color: 'B'},
  'D8': {type: 'Queen', color: 'B'},
  'E8': {type: 'King', color: 'B'},
  'F8': {type: 'Bishop', color: 'B'},
  'G8': {type: 'Knight', color: 'B'},
  'H8': {type: 'Rook', color: 'B'},
  'A7': {type: 'Pawn', color: 'B'},
  'B7': {type: 'Pawn', color: 'B'},
  'C7': {type: 'Pawn', color: 'B'},
  'D7': {type: 'Pawn', color: 'B'},
  'E7': {type: 'Pawn', color: 'B'},
  'F7': {type: 'Pawn', color: 'B'},
  'G7': {type: 'Pawn', color: 'B'},
  'H7': {type: 'Pawn', color: 'B'},
  'A6': {},
  'B6': {},
  'C6': {},
  'D6': {},
  'E6': {},
  'F6': {},
  'G6': {},
  'H6': {},
  'A5': {},
  'B5': {},
  'C5': {},
  'D5': {},
  'E5': {},
  'F5': {},
  'G5': {},
  'H5': {},
  'A4': {},
  'B4': {},
  'C4': {},
  'D4': {},
  'E4': {},
  'F4': {},
  'G4': {},
  'H4': {},
  'A3': {},
  'B3': {},
  'C3': {},
  'D3': {},
  'E3': {},
  'F3': {},
  'G3': {},
  'H3': {},
  'A2': {type: 'Pawn', color: 'W'},
  'B2': {type: 'Pawn', color: 'W'},
  'C2': {type: 'Pawn', color: 'W'},
  'D2': {type: 'Pawn', color: 'W'},
  'E2': {type: 'Pawn', color: 'W'},
  'F2': {type: 'Pawn', color: 'W'},
  'G2': {type: 'Pawn', color: 'W'},
  'H2': {type: 'Pawn', color: 'W'},
  'A1': {type: 'Rook', color: 'W'},
  'B1': {type: 'Knight', color: 'W'},
  'C1': {type: 'Bishop', color: 'W'},
  'D1': {type: 'Queen', color: 'W'},
  'E1': {type: 'King', color: 'W'},
  'F1': {type: 'Bishop', color: 'W'},
  'G1': {type: 'Knight', color: 'W'},
  'H1': {type: 'Rook', color: 'W'},
};

export const pieces = (state = initPiecesPlacement, action) => {
  switch (action.type) {
    case actionTypes.CHANGED_SELECTED_PIECE: {
      return state
    }
    default:
      return state
  }
};
