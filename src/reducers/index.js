import * as _ from 'lodash'
import {rookPath, knightPath, queenPath, bishopPath, pawnPath, kingPath} from "../constants/index";

const rootReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CELL_CLICKED':
            console.log(state.turn + ' turn');
            console.log(state.turn + ' ' + action.pieceType.type + ' Clicked at ' + action.placement);
            //maybe I can delegate it to another reducer
            //changed selected piece
            if(state.selected !== '' && action.pieceType.type !== undefined && action.pieceType.color === state.turn) {
                console.log('changed piece');
                let paths = calculatePath(state.pieces, action.pieceType, action.placement);
                console.log(paths);
                return {...state, selected: {placement: action.placement, pieceType: action.pieceType}, paths: paths};
            }
            //move
            if (state.selected !== '' && state.selected.pieceType.type !== undefined) {
                if(state.paths[0].includes(action.placement) || state.paths[1].includes(action.placement)){
                    let formerPlacement = state.selected.placement;
                    let newPlacement = action.placement;
                    let newPlacementPiece = state.pieces[state.selected.placement];
                    return {...state, pieces: Object.assign({}, state.pieces, {[formerPlacement]:{},
                        [newPlacement]: {type: newPlacementPiece.type, color: newPlacementPiece.color}}),
                        selected: '', paths:[[],[]], turn: state.turn === 'W' ? 'B' : 'W'};
                }
                else{
                    //error: an illegal move
                    console.log('illegal move');
                    return {...state, selected: '', paths:[[],[]]}
                }
            }
            else{
                if (state.selected === '' && action.pieceType.type !== undefined && action.pieceType.color === state.turn) {
                    console.log('selected a piece');
                    let paths = calculatePath(state.pieces, action.pieceType, action.placement);
                    console.log(paths);
                    return {...state, selected: {placement: action.placement, pieceType: action.pieceType}, paths: paths};
                }
                else{
                    console.log('not '+ action.pieceType.color + 'turn');
                    return {...state, selected: {placement: action.placement, pieceType: action.pieceType}};
                }
            }
        default:
            return state;
    }
};

const calculatePath = (pieces, piece, placement) => {
    let paths = [[],[]];
        switch (piece.type) {
            case 'Pawn':
                paths = pawnPath(pieces, piece, placement);
                break;
            case 'Bishop':
                paths = bishopPath(pieces, piece, placement);
                break;
            case 'Rook':
                paths = rookPath(pieces, piece, placement);
                break;
            case 'Queen':
                paths = queenPath(pieces, piece, placement);
                break;
            case 'Knight':
                paths = knightPath(pieces, piece, placement);
                break;
            case 'King':
                paths = kingPath(pieces, piece, placement);
                break;
            default:
                break;
        }
    return paths;
};


export default rootReducer;
