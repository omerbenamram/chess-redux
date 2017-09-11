import * as actionTypes from "../constants/actionTypes"
import {threats} from "./threats";
import {BLACK, WHITE} from "../constants/index";

// test('get threats with init board (should return nothing)', () =>{
//     let prevState = {pieces: {
//   'A8': {type: 'Rook', color: 'B', selected: false},
//   'B8': {type: 'Knight', color: 'B', selected: false},
//   'C8': {type: 'Bishop', color: 'B', selected: false},
//   'D8': {type: 'Queen', color: 'B', selected: false},
//   'E8': {type: 'King', color: 'B', selected: false},
//   'F8': {type: 'Bishop', color: 'B', selected: false},
//   'G8': {type: 'Knight', color: 'B', selected: false},
//   'H8': {type: 'Rook', color: 'B', selected: false},
//   'A7': {type: 'Pawn', color: 'B', selected: false},
//   'B7': {type: 'Pawn', color: 'B', selected: false},
//   'C7': {type: 'Pawn', color: 'B', selected: false},
//   'D7': {type: 'Pawn', color: 'B', selected: false},
//   'E7': {type: 'Pawn', color: 'B', selected: false},
//   'F7': {type: 'Pawn', color: 'B', selected: false},
//   'G7': {type: 'Pawn', color: 'B', selected: false},
//   'H7': {type: 'Pawn', color: 'B', selected: false},
//   'A6': {type: null, color: null, selected:false},
//   'B6': {type: null, color: null, selected:false},
//   'C6': {type: null, color: null, selected:false},
//   'D6': {type: null, color: null, selected:false},
//   'E6': {type: null, color: null, selected:false},
//   'F6': {type: null, color: null, selected:false},
//   'G6': {type: null, color: null, selected:false},
//   'H6': {type: null, color: null, selected:false},
//   'A5': {type: null, color: null, selected:false},
//   'B5': {type: null, color: null, selected:false},
//   'C5': {type: null, color: null, selected:false},
//   'D5': {type: null, color: null, selected:false},
//   'E5': {type: null, color: null, selected:false},
//   'F5': {type: null, color: null, selected:false},
//   'G5': {type: null, color: null, selected:false},
//   'H5': {type: null, color: null, selected:false},
//   'A4': {type: null, color: null, selected:false},
//   'B4': {type: null, color: null, selected:false},
//   'C4': {type: null, color: null, selected:false},
//   'D4': {type: null, color: null, selected:false},
//   'E4': {type: null, color: null, selected:false},
//   'F4': {type: null, color: null, selected:false},
//   'G4': {type: null, color: null, selected:false},
//   'H4': {type: null, color: null, selected:false},
//   'A3': {type: null, color: null, selected:false},
//   'B3': {type: null, color: null, selected:false},
//   'C3': {type: null, color: null, selected:false},
//   'D3': {type: null, color: null, selected:false},
//   'E3': {type: null, color: null, selected:false},
//   'F3': {type: null, color: null, selected:false},
//   'G3': {type: null, color: null, selected:false},
//   'H3': {type: null, color: null, selected:false},
//   'A2': {type: 'Pawn', color: 'W', selected: false},
//   'B2': {type: 'Pawn', color: 'W', selected: false},
//   'C2': {type: 'Pawn', color: 'W', selected: false},
//   'D2': {type: 'Pawn', color: 'W', selected: false},
//   'E2': {type: 'Pawn', color: 'W', selected: false},
//   'F2': {type: 'Pawn', color: 'W', selected: false},
//   'G2': {type: 'Pawn', color: 'W', selected: false},
//   'H2': {type: 'Pawn', color: 'W', selected: false},
//   'A1': {type: 'Rook', color: 'W', selected: false},
//   'B1': {type: 'Knight', color: 'W', selected: false},
//   'C1': {type: 'Bishop', color: 'W', selected: false},
//   'D1': {type: 'Queen', color: 'W', selected: false},
//   'E1': {type: 'King', color: 'W', selected: false},
//   'F1': {type: 'Bishop', color: 'W', selected: false},
//   'G1': {type: 'Knight', color: 'W', selected: false},
//   'H1': {type: 'Rook', color: 'W', selected: false},
// }, paths:{move:[], eat:[]}, threats:[]};
//     let action = {type: actionTypes.GET_THREATS, color:BLACK};
//     let nextState = {pieces: {
//   'A8': {type: 'Rook', color: 'B', selected: false},
//   'B8': {type: 'Knight', color: 'B', selected: false},
//   'C8': {type: 'Bishop', color: 'B', selected: false},
//   'D8': {type: 'Queen', color: 'B', selected: false},
//   'E8': {type: 'King', color: 'B', selected: false},
//   'F8': {type: 'Bishop', color: 'B', selected: false},
//   'G8': {type: 'Knight', color: 'B', selected: false},
//   'H8': {type: 'Rook', color: 'B', selected: false},
//   'A7': {type: 'Pawn', color: 'B', selected: false},
//   'B7': {type: 'Pawn', color: 'B', selected: false},
//   'C7': {type: 'Pawn', color: 'B', selected: false},
//   'D7': {type: 'Pawn', color: 'B', selected: false},
//   'E7': {type: 'Pawn', color: 'B', selected: false},
//   'F7': {type: 'Pawn', color: 'B', selected: false},
//   'G7': {type: 'Pawn', color: 'B', selected: false},
//   'H7': {type: 'Pawn', color: 'B', selected: false},
//   'A6': {type: null, color: null, selected:false},
//   'B6': {type: null, color: null, selected:false},
//   'C6': {type: null, color: null, selected:false},
//   'D6': {type: null, color: null, selected:false},
//   'E6': {type: null, color: null, selected:false},
//   'F6': {type: null, color: null, selected:false},
//   'G6': {type: null, color: null, selected:false},
//   'H6': {type: null, color: null, selected:false},
//   'A5': {type: null, color: null, selected:false},
//   'B5': {type: null, color: null, selected:false},
//   'C5': {type: null, color: null, selected:false},
//   'D5': {type: null, color: null, selected:false},
//   'E5': {type: null, color: null, selected:false},
//   'F5': {type: null, color: null, selected:false},
//   'G5': {type: null, color: null, selected:false},
//   'H5': {type: null, color: null, selected:false},
//   'A4': {type: null, color: null, selected:false},
//   'B4': {type: null, color: null, selected:false},
//   'C4': {type: null, color: null, selected:false},
//   'D4': {type: null, color: null, selected:false},
//   'E4': {type: null, color: null, selected:false},
//   'F4': {type: null, color: null, selected:false},
//   'G4': {type: null, color: null, selected:false},
//   'H4': {type: null, color: null, selected:false},
//   'A3': {type: null, color: null, selected:false},
//   'B3': {type: null, color: null, selected:false},
//   'C3': {type: null, color: null, selected:false},
//   'D3': {type: null, color: null, selected:false},
//   'E3': {type: null, color: null, selected:false},
//   'F3': {type: null, color: null, selected:false},
//   'G3': {type: null, color: null, selected:false},
//   'H3': {type: null, color: null, selected:false},
//   'A2': {type: 'Pawn', color: 'W', selected: false},
//   'B2': {type: 'Pawn', color: 'W', selected: false},
//   'C2': {type: 'Pawn', color: 'W', selected: false},
//   'D2': {type: 'Pawn', color: 'W', selected: false},
//   'E2': {type: 'Pawn', color: 'W', selected: false},
//   'F2': {type: 'Pawn', color: 'W', selected: false},
//   'G2': {type: 'Pawn', color: 'W', selected: false},
//   'H2': {type: 'Pawn', color: 'W', selected: false},
//   'A1': {type: 'Rook', color: 'W', selected: false},
//   'B1': {type: 'Knight', color: 'W', selected: false},
//   'C1': {type: 'Bishop', color: 'W', selected: false},
//   'D1': {type: 'Queen', color: 'W', selected: false},
//   'E1': {type: 'King', color: 'W', selected: false},
//   'F1': {type: 'Bishop', color: 'W', selected: false},
//   'G1': {type: 'Knight', color: 'W', selected: false},
//   'H1': {type: 'Rook', color: 'W', selected: false},
// }, paths:{move:[], eat:[]}, threats:[]};
//     expect(threats(prevState, action)).toEqual(nextState);
// });

test('black king checked by white queen on b5', () =>{
    let prevState ={
    pieces: {
      A8: {
        type: 'Rook',
        color: 'B',
        selected: false
      },
      B8: {
        type: 'Knight',
        color: 'B',
        selected: false
      },
      C8: {
        type: 'Bishop',
        color: 'B',
        selected: false
      },
      D8: {
        type: 'Queen',
        color: 'B',
        selected: false
      },
      E8: {
        type: 'King',
        color: 'B',
        selected: false
      },
      F8: {
        type: 'Bishop',
        color: 'B',
        selected: false
      },
      G8: {
        type: 'Knight',
        color: 'B',
        selected: false
      },
      H8: {
        type: 'Rook',
        color: 'B',
        selected: false
      },
      A7: {
        type: 'Pawn',
        color: 'B',
        selected: false
      },
      B7: {
        type: 'Pawn',
        color: 'B',
        selected: false
      },
      C7: {
        type: 'Pawn',
        color: 'B',
        selected: false
      },
      D7: {
        type: null,
        color: null,
        selected: false
      },
      E7: {
        type: 'Pawn',
        color: 'B',
        selected: false
      },
      F7: {
        type: null,
        color: null,
        selected: false
      },
      G7: {
        type: 'Pawn',
        color: 'B',
        selected: false
      },
      H7: {
        type: 'Pawn',
        color: 'B',
        selected: false
      },
      A6: {
        type: null,
        color: null,
        selected: false
      },
      B6: {
        type: null,
        color: null,
        selected: false
      },
      C6: {
        type: null,
        color: null,
        selected: false
      },
      D6: {
        type: null,
        color: null,
        selected: false
      },
      E6: {
        type: null,
        color: null,
        selected: false
      },
      F6: {
        type: null,
        color: null,
        selected: false
      },
      G6: {
        type: null,
        color: null,
        selected: false
      },
      H6: {
        type: null,
        color: null,
        selected: false
      },
      A5: {
        type: null,
        color: null,
        selected: false
      },
      B5: {
        type: 'Queen',
        color: 'W',
        selected: false
      },
      C5: {
        type: null,
        color: null,
        selected: false
      },
      D5: {
        type: 'Pawn',
        color: 'B',
        selected: false
      },
      E5: {
        type: null,
        color: null,
        selected: false
      },
      F5: {
        type: 'Pawn',
        color: 'B',
        selected: false
      },
      G5: {
        type: null,
        color: null,
        selected: false
      },
      H5: {
        type: null,
        color: null,
        selected: false
      },
      A4: {
        type: null,
        color: null,
        selected: false
      },
      B4: {
        type: null,
        color: null,
        selected: false
      },
      C4: {
        type: null,
        color: null,
        selected: false
      },
      D4: {
        type: null,
        color: null,
        selected: false
      },
      E4: {
        type: 'Pawn',
        color: 'W',
        selected: false
      },
      F4: {
        type: null,
        color: null,
        selected: false
      },
      G4: {
        type: null,
        color: null,
        selected: false
      },
      H4: {
        type: null,
        color: null,
        selected: false
      },
      A3: {
        type: null,
        color: null,
        selected: false
      },
      B3: {
        type: null,
        color: null,
        selected: false
      },
      C3: {
        type: null,
        color: null,
        selected: false
      },
      D3: {
        type: null,
        color: null,
        selected: false
      },
      E3: {
        type: null,
        color: null,
        selected: false
      },
      F3: {
        type: null,
        color: null,
        selected: false
      },
      G3: {
        type: null,
        color: null,
        selected: false
      },
      H3: {
        type: null,
        color: null,
        selected: false
      },
      A2: {
        type: 'Pawn',
        color: 'W',
        selected: false
      },
      B2: {
        type: 'Pawn',
        color: 'W',
        selected: false
      },
      C2: {
        type: 'Pawn',
        color: 'W',
        selected: false
      },
      D2: {
        type: 'Pawn',
        color: 'W',
        selected: false
      },
      E2: {
        type: null,
        color: null,
        selected: false
      },
      F2: {
        type: 'Pawn',
        color: 'W',
        selected: false
      },
      G2: {
        type: 'Pawn',
        color: 'W',
        selected: false
      },
      H2: {
        type: 'Pawn',
        color: 'W',
        selected: false
      },
      A1: {
        type: 'Rook',
        color: 'W',
        selected: false
      },
      B1: {
        type: 'Knight',
        color: 'W',
        selected: false
      },
      C1: {
        type: 'Bishop',
        color: 'W',
        selected: false
      },
      D1: {
        type: null,
        color: null,
        selected: false
      },
      E1: {
        type: 'King',
        color: 'W',
        selected: false
      },
      F1: {
        type: 'Bishop',
        color: 'W',
        selected: false
      },
      G1: {
        type: 'Knight',
        color: 'W',
        selected: false
      },
      H1: {
        type: 'Rook',
        color: 'W',
        selected: false
      }
    },
    paths: {
      move: [],
      eat: []
    },
    threats:[],
};
    let action = {type: actionTypes.GET_THREATS, color:BLACK};
    let nextState = {
    pieces: {
      A8: {
        type: 'Rook',
        color: 'B',
        selected: false
      },
      B8: {
        type: 'Knight',
        color: 'B',
        selected: false
      },
      C8: {
        type: 'Bishop',
        color: 'B',
        selected: false
      },
      D8: {
        type: 'Queen',
        color: 'B',
        selected: false
      },
      E8: {
        type: 'King',
        color: 'B',
        selected: false
      },
      F8: {
        type: 'Bishop',
        color: 'B',
        selected: false
      },
      G8: {
        type: 'Knight',
        color: 'B',
        selected: false
      },
      H8: {
        type: 'Rook',
        color: 'B',
        selected: false
      },
      A7: {
        type: 'Pawn',
        color: 'B',
        selected: false
      },
      B7: {
        type: 'Pawn',
        color: 'B',
        selected: false
      },
      C7: {
        type: 'Pawn',
        color: 'B',
        selected: false
      },
      D7: {
        type: null,
        color: null,
        selected: false
      },
      E7: {
        type: 'Pawn',
        color: 'B',
        selected: false
      },
      F7: {
        type: null,
        color: null,
        selected: false
      },
      G7: {
        type: 'Pawn',
        color: 'B',
        selected: false
      },
      H7: {
        type: 'Pawn',
        color: 'B',
        selected: false
      },
      A6: {
        type: null,
        color: null,
        selected: false
      },
      B6: {
        type: null,
        color: null,
        selected: false
      },
      C6: {
        type: null,
        color: null,
        selected: false
      },
      D6: {
        type: null,
        color: null,
        selected: false
      },
      E6: {
        type: null,
        color: null,
        selected: false
      },
      F6: {
        type: null,
        color: null,
        selected: false
      },
      G6: {
        type: null,
        color: null,
        selected: false
      },
      H6: {
        type: null,
        color: null,
        selected: false
      },
      A5: {
        type: null,
        color: null,
        selected: false
      },
      B5: {
        type: 'Queen',
        color: 'W',
        selected: false
      },
      C5: {
        type: null,
        color: null,
        selected: false
      },
      D5: {
        type: 'Pawn',
        color: 'B',
        selected: false
      },
      E5: {
        type: null,
        color: null,
        selected: false
      },
      F5: {
        type: 'Pawn',
        color: 'B',
        selected: false
      },
      G5: {
        type: null,
        color: null,
        selected: false
      },
      H5: {
        type: null,
        color: null,
        selected: false
      },
      A4: {
        type: null,
        color: null,
        selected: false
      },
      B4: {
        type: null,
        color: null,
        selected: false
      },
      C4: {
        type: null,
        color: null,
        selected: false
      },
      D4: {
        type: null,
        color: null,
        selected: false
      },
      E4: {
        type: 'Pawn',
        color: 'W',
        selected: false
      },
      F4: {
        type: null,
        color: null,
        selected: false
      },
      G4: {
        type: null,
        color: null,
        selected: false
      },
      H4: {
        type: null,
        color: null,
        selected: false
      },
      A3: {
        type: null,
        color: null,
        selected: false
      },
      B3: {
        type: null,
        color: null,
        selected: false
      },
      C3: {
        type: null,
        color: null,
        selected: false
      },
      D3: {
        type: null,
        color: null,
        selected: false
      },
      E3: {
        type: null,
        color: null,
        selected: false
      },
      F3: {
        type: null,
        color: null,
        selected: false
      },
      G3: {
        type: null,
        color: null,
        selected: false
      },
      H3: {
        type: null,
        color: null,
        selected: false
      },
      A2: {
        type: 'Pawn',
        color: 'W',
        selected: false
      },
      B2: {
        type: 'Pawn',
        color: 'W',
        selected: false
      },
      C2: {
        type: 'Pawn',
        color: 'W',
        selected: false
      },
      D2: {
        type: 'Pawn',
        color: 'W',
        selected: false
      },
      E2: {
        type: null,
        color: null,
        selected: false
      },
      F2: {
        type: 'Pawn',
        color: 'W',
        selected: false
      },
      G2: {
        type: 'Pawn',
        color: 'W',
        selected: false
      },
      H2: {
        type: 'Pawn',
        color: 'W',
        selected: false
      },
      A1: {
        type: 'Rook',
        color: 'W',
        selected: false
      },
      B1: {
        type: 'Knight',
        color: 'W',
        selected: false
      },
      C1: {
        type: 'Bishop',
        color: 'W',
        selected: false
      },
      D1: {
        type: null,
        color: null,
        selected: false
      },
      E1: {
        type: 'King',
        color: 'W',
        selected: false
      },
      F1: {
        type: 'Bishop',
        color: 'W',
        selected: false
      },
      G1: {
        type: 'Knight',
        color: 'W',
        selected: false
      },
      H1: {
        type: 'Rook',
        color: 'W',
        selected: false
      }
    },
    paths: {
      move: [],
      eat: []
    },
    threats:['B5'],
};
    expect(threats(prevState, action)).toEqual(nextState);
});