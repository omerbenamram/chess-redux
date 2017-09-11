import * as actionTypes from "../constants/actionTypes"
import {selected} from "./selected";

test('change selected while none are selected', () => {
    let prevState = {'A4': {type: 'Pawn', color:'W', selected:false}};
    let action = {type: actionTypes.SELECTED_PIECE, placement: 'A4'};
    let nextState = {'A4': {type: 'Pawn', color:'W', selected:true}};

    expect(selected(prevState, action)).toEqual(nextState);
});
test('return state when it isn\'t the correct placement', () => {
    let prevState = {'A4': {type: 'Pawn', color:'W', selected:false}};
    let action = {type: actionTypes.SELECTED_PIECE, placement: 'b4'};
    let nextState = {'A4': {type: 'Pawn', color:'W', selected:false}};

    expect(selected(prevState, action)).toEqual(nextState);
});
