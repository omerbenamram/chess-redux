import * as actionTypes from "../constants/actionTypes";
import * as _ from 'lodash';
import {selected} from "./selected";
import {paths} from "./paths";
import {threats} from "./threats";


const initPiecesPlacement = {
    'A8': {type: 'Rook', color: 'B', selected: false},
    'B8': {type: 'Knight', color: 'B', selected: false},
    'C8': {type: 'Bishop', color: 'B', selected: false},
    'D8': {type: 'Queen', color: 'B', selected: false},
    'E8': {type: 'King', color: 'B', selected: false},
    'F8': {type: 'Bishop', color: 'B', selected: false},
    'G8': {type: 'Knight', color: 'B', selected: false},
    'H8': {type: 'Rook', color: 'B', selected: false},
    'A7': {type: 'Pawn', color: 'B', selected: false},
    'B7': {type: 'Pawn', color: 'B', selected: false},
    'C7': {type: 'Pawn', color: 'B', selected: false},
    'D7': {type: 'Pawn', color: 'B', selected: false},
    'E7': {type: 'Pawn', color: 'B', selected: false},
    'F7': {type: 'Pawn', color: 'B', selected: false},
    'G7': {type: 'Pawn', color: 'B', selected: false},
    'H7': {type: 'Pawn', color: 'B', selected: false},
    'A6': {type: null, color: null, selected:false},
    'B6': {type: null, color: null, selected:false},
    'C6': {type: null, color: null, selected:false},
    'D6': {type: null, color: null, selected:false},
    'E6': {type: null, color: null, selected:false},
    'F6': {type: null, color: null, selected:false},
    'G6': {type: null, color: null, selected:false},
    'H6': {type: null, color: null, selected:false},
    'A5': {type: null, color: null, selected:false},
    'B5': {type: null, color: null, selected:false},
    'C5': {type: null, color: null, selected:false},
    'D5': {type: null, color: null, selected:false},
    'E5': {type: null, color: null, selected:false},
    'F5': {type: null, color: null, selected:false},
    'G5': {type: null, color: null, selected:false},
    'H5': {type: null, color: null, selected:false},
    'A4': {type: null, color: null, selected:false},
    'B4': {type: null, color: null, selected:false},
    'C4': {type: null, color: null, selected:false},
    'D4': {type: null, color: null, selected:false},
    'E4': {type: null, color: null, selected:false},
    'F4': {type: null, color: null, selected:false},
    'G4': {type: null, color: null, selected:false},
    'H4': {type: null, color: null, selected:false},
    'A3': {type: null, color: null, selected:false},
    'B3': {type: null, color: null, selected:false},
    'C3': {type: null, color: null, selected:false},
    'D3': {type: null, color: null, selected:false},
    'E3': {type: null, color: null, selected:false},
    'F3': {type: null, color: null, selected:false},
    'G3': {type: null, color: null, selected:false},
    'H3': {type: null, color: null, selected:false},
    'A2': {type: 'Pawn', color: 'W', selected: false},
    'B2': {type: 'Pawn', color: 'W', selected: false},
    'C2': {type: 'Pawn', color: 'W', selected: false},
    'D2': {type: 'Pawn', color: 'W', selected: false},
    'E2': {type: 'Pawn', color: 'W', selected: false},
    'F2': {type: 'Pawn', color: 'W', selected: false},
    'G2': {type: 'Pawn', color: 'W', selected: false},
    'H2': {type: 'Pawn', color: 'W', selected: false},
    'A1': {type: 'Rook', color: 'W', selected: false},
    'B1': {type: 'Knight', color: 'W', selected: false},
    'C1': {type: 'Bishop', color: 'W', selected: false},
    'D1': {type: 'Queen', color: 'W', selected: false},
    'E1': {type: 'King', color: 'W', selected: false},
    'F1': {type: 'Bishop', color: 'W', selected: false},
    'G1': {type: 'Knight', color: 'W', selected: false},
    'H1': {type: 'Rook', color: 'W', selected: false},
};
const initPath = {move:[], eat:[]};

export const board = (state = {checked: null, checkmate:false, pieces: initPiecesPlacement, paths: initPath}, action) => {
    switch (action.type) {
        case actionTypes.SELECTED_PIECE:
            return {
                ...state, pieces: _.mapValues(state.pieces, (value, key) => {
                    let sel = selected({[key]: value}, action);
                    //this sucks
                    return sel[_.keys(sel)[0]]
                })
            };

        case actionTypes.CALCULATE_PATH:
            return {...state, paths: paths(state.paths, action)};

        case actionTypes.GET_CHECKED:
            let selectedPlacement = findSelected(state.pieces);
            let newPathsMove = getPathsThatDontCheck(selectedPlacement,state.paths.move,state.pieces,action);
            let newPathsEat =  getPathsThatDontCheck(selectedPlacement,state.paths.eat,state.pieces,action);
            return {...state, paths: {move:newPathsMove, eat:newPathsEat}};


        case actionTypes.IS_CHECKMATE:
            let checkedColorPieces =[];
            _.forEach(state.pieces, (piece, key) =>{
               if(piece.color === action.color) {
                   checkedColorPieces.push({[key]: piece});
               }
            });
            _.forEach(checkedColorPieces, (piece, placement)=>{
                let newPathsMove = getPathsThatDontCheck(placement,state.paths.move,state.pieces,action);
                let newPathsEat =  getPathsThatDontCheck(placement,state.paths.eat,state.pieces,action);

                if(!_.isEmpty(newPathsMove) || !_.isEmpty(newPathsEat))
                {
                    return state
                }
            });
            return {...state, checkmate:true};


        case actionTypes.RESET_CHECK:
            return {...state, checked:null};
        case actionTypes.CHECK:
            let threat  = threats([], action);
            let placementsThatCheck = paths(threat, action);
            if(!_.isEmpty(placementsThatCheck)){
                return {...state, checked:action.color};
            }
            return state;

        case actionTypes.PIECE_MOVED:
            //check if placement in paths move
            if(state.paths.move.includes(action.newPlacement)) {
                return {
                    ...state, pieces: Object.assign({}, state.pieces, {
                        [action.newPlacement]: selected({[action.newPlacement]: state.pieces[action.oldPlacement]}, action),
                        [action.oldPlacement]: {type: null, color: null, selected: false}}),paths: paths(state.paths, action)
                };
            }
            console.log('illegal move');
            return state;

        case actionTypes.PIECE_TRY_EAT:
            //check if placement in paths eat
            if(state.paths.eat.includes(action.newPlacement)) {
                return {
                    ...state, pieces: Object.assign({}, state.pieces, {
                        [action.newPlacement]: selected({[action.newPlacement]: state.pieces[action.oldPlacement]}, action),
                        [action.oldPlacement]: {type: null, color: null, selected: false}
                    }), paths: paths(state.paths, action)
                };
            }
            console.log('illegal eat move');
            return state;

        default:
            return state
    }
};

const findSelected = (pieces) =>{
    return _.findKey(pieces, (piece) => { return piece.selected})
};
const move = (pieces, firstPlacement, secondPlacement) => {
    return {...pieces, [secondPlacement]:pieces[firstPlacement], [firstPlacement]: {type: null, color: null, selected: false}};
};

const getPathsThatDontCheck = (selectedPlacement, path, pieces, action) =>{
    return _.filter(path, (placement) =>{
                let currentPieces = move(pieces, selectedPlacement, placement);
                let newAction = {...action, pieces:currentPieces};
                let threat  = threats([], newAction);
                let placementsThatCheck = paths(threat, newAction);
                if(_.isEmpty(placementsThatCheck)){
                    return true;
                }
            });
};