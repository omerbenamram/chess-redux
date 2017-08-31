import * as _ from 'lodash'

const rootReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CELL_CLICKED':
            console.log(action.pieceType + ' Clicked at ' + action.placement);
            //maybe I can delegate it to another reducer
            //changed selected piece
            if(state.selected !== '' && action.pieceType.type !== undefined && state.selected.pieceType.color === action.pieceType.color) {
                console.log('changed piece');
                let paths = calculatePath(state.pieces, action.pieceType, action.placement);
                console.log(paths);
                return {...state, selected: {placement: action.placement, pieceType: action.pieceType}, paths: paths};

            }
            //move
            if (state.selected !== '' && state.selected.pieceType.type !== undefined) {
                console.log(state.paths[0].includes(action.placement));
                if(state.paths[0].includes(action.placement) || state.paths[1].includes(action.placement)){
                    let formerPlacement = state.selected.placement;
                    let newPlacement = action.placement;
                    let newPlacementPiece = state.pieces[state.selected.placement];
                    return {...state, pieces: Object.assign({}, state.pieces, {[formerPlacement]:{},
                        [newPlacement]: {type: newPlacementPiece.type, color: newPlacementPiece.color}}),
                        selected: '', paths:[[],[]]};
                }
                else{
                    //error: an illegal move
                    console.log('illegal move');
                    return {...state, selected: '', paths:[[],[]]}
                }
            }
            else{
                if (state.selected === '' && action.pieceType.type !== undefined) {
                    console.log('selected a piece');
                    let paths = calculatePath(state.pieces, action.pieceType, action.placement);
                    console.log(paths);
                    return {...state, selected: {placement: action.placement, pieceType: action.pieceType}, paths: paths};
                }
                else{
                    console.log('something went wrong');
                    return {...state, selected: {placement: action.placement, pieceType: action.pieceType}};
                }
            }
        default:
            return state;
    }
};


const pawnPath = (pieces, piece, placement) => {
    let paths = [[],[]];
    let placementChar = placement.slice(0,1);
    let placementNumber = parseInt(placement.slice(1));
    if(piece.color === 'B') {
        if(placementNumber === 7){
            for (let i=1; i < 3; i++) {
                let newPlacementNumber = placementNumber - i ;
                let newPlacement = placementChar + newPlacementNumber.toString();
                if (isBlocking(pieces, newPlacement, piece.color).type) {
                    break;
                }
                paths[0].push(newPlacement);
            }
        }
        else{
            for (let i=1; i < 2; i++) {
                let newPlacementNumber = placementNumber - i ;
                let newPlacement = placementChar + newPlacementNumber.toString();
                if (isBlocking(pieces, newPlacement, piece.color).type) {
                    break;
                }
                paths[0].push(newPlacement);
            }

        }
        let newPlacementNumber = placementNumber - 1;
        let EatingPlacement = String.fromCharCode(placementChar.charCodeAt(0) + 1) + newPlacementNumber;
        if(pieces[EatingPlacement] !== undefined && pieces[EatingPlacement].color === 'W'){
            paths[1].push(EatingPlacement);
        }
        EatingPlacement = String.fromCharCode(placementChar.charCodeAt(0) - 1) + newPlacementNumber;
        if(pieces[EatingPlacement] !== undefined && pieces[EatingPlacement].color === 'W'){
            paths[1].push(EatingPlacement);
        }

    }
    else{
        if(placementNumber === 2){
            for (let i=1; i < 3; i++) {
                let newPlacementNumber = placementNumber + i ;
                let newPlacement = placementChar + newPlacementNumber.toString();
                if (isBlocking(pieces, newPlacement, piece.color).type) {
                    break;
                }
                paths[0].push(newPlacement);
            }
        }
        else{
            for (let i=1; i < 2; i++) {
                let newPlacementNumber = placementNumber + i ;
                let newPlacement = placementChar + newPlacementNumber.toString();
                if (isBlocking(pieces, newPlacement, piece.color).type) {
                    break;
                }
                paths[0].push(newPlacement);

            }

        }
        let newPlacementNumber = placementNumber + 1;
        let EatingPlacement = String.fromCharCode(placementChar.charCodeAt(0) + 1) + newPlacementNumber;
        if(pieces[EatingPlacement] !== undefined && pieces[EatingPlacement].color === 'B'){
            paths[1].push(EatingPlacement);
        }
        EatingPlacement = String.fromCharCode(placementChar.charCodeAt(0) - 1) + newPlacementNumber;
        if(pieces[EatingPlacement] !== undefined && pieces[EatingPlacement].color === 'B'){
            paths[1].push(EatingPlacement);
        }
    }
    return paths
};

const bishopPath = (pieces, piece, placement) => {
    let paths = [[],[]];
    let placementChar = placement.slice(0,1);
    let placementNumber = parseInt(placement.slice(1));
    //up-right
    for (let i=1; i < 8; i++){
        let newPlacementNumber = placementNumber + i ;
        let newPlacementLetter = String.fromCharCode(placementChar.charCodeAt(0) + i);
        let newPlacement = newPlacementLetter + newPlacementNumber.toString();
        let isBlocked = isBlocking(pieces, newPlacement, piece.color);
        if (isBlocked.type) {
            if(isBlocked.color) {
                paths[1].push(newPlacement);
            }
            break;
        }
        paths[0].push(newPlacement);
    }//down-right
    for (let i=1; i < 8; i++){
        let newPlacementNumber = placementNumber - i ;
        let newPlacementLetter = String.fromCharCode(placementChar.charCodeAt(0) + i);
        let newPlacement = newPlacementLetter + newPlacementNumber.toString();
        let isBlocked = isBlocking(pieces, newPlacement, piece.color);
        if (isBlocked.type) {
            if(isBlocked.color) {
                paths[1].push(newPlacement);
            }
            break;
        }
        paths[0].push(newPlacement);
    }//down-left
    for (let i=1; i < 8; i++){
        let newPlacementNumber = placementNumber - i ;
        let newPlacementLetter = String.fromCharCode(placementChar.charCodeAt(0) - i);
        let newPlacement = newPlacementLetter + newPlacementNumber.toString();
        let isBlocked = isBlocking(pieces, newPlacement, piece.color);
        if (isBlocked.type) {
            if(isBlocked.color) {
                paths[1].push(newPlacement);
            }
            break;
        }
        paths[0].push(newPlacement);
    }//up-left
    for (let i=1; i < 8; i++){
        let newPlacementNumber = placementNumber + i ;
        let newPlacementLetter = String.fromCharCode(placementChar.charCodeAt(0) - i);
        let newPlacement = newPlacementLetter + newPlacementNumber.toString();
        let isBlocked = isBlocking(pieces, newPlacement, piece.color);
        if (isBlocked.type) {
            if(isBlocked.color) {
                paths[1].push(newPlacement);
            }
            break;
        }
        paths[0].push(newPlacement);
    }

    return paths;
};

const rookPath = (pieces, piece, placement) => {
    let paths = [[],[]];
    let placementChar = placement.slice(0,1);
    let placementNumber = parseInt(placement.slice(1));
    //up
    for (let i=1; i < 8; i++){
        let newPlacementNumber = placementNumber + i ;
        let newPlacement = placementChar + newPlacementNumber.toString();
        let isBlocked = isBlocking(pieces, newPlacement, piece.color);
        if (isBlocked.type) {
            if(isBlocked.color) {
                paths[1].push(newPlacement);
            }
            break;
        }
        paths[0].push(newPlacement);
    }//right
    for (let i=1; i < 8; i++){
        let newPlacementLetter = String.fromCharCode(placementChar.charCodeAt(0) + i);
        let newPlacement = newPlacementLetter + placementNumber.toString();
        let isBlocked = isBlocking(pieces, newPlacement, piece.color);
        if (isBlocked.type) {
            if(isBlocked.color) {
                paths[1].push(newPlacement);
            }
            break;
        }
        paths[0].push(newPlacement);
    }//down
    for (let i=1; i < 8; i++){
        let newPlacementNumber = placementNumber - i ;
        let newPlacement = placementChar + newPlacementNumber.toString();
        let isBlocked = isBlocking(pieces, newPlacement, piece.color);
        if (isBlocked.type) {
            if(isBlocked.color) {
                paths[1].push(newPlacement);
            }
            break;
        }
        paths[0].push(newPlacement);
    }//left
    for (let i=1; i < 8; i++){
        let newPlacementLetter = String.fromCharCode(placementChar.charCodeAt(0) - i);
        let newPlacement = newPlacementLetter + placementNumber.toString();
        let isBlocked = isBlocking(pieces, newPlacement, piece.color);
        if (isBlocked.type) {
            if(isBlocked.color) {
                paths[1].push(newPlacement);
            }
            break;
        }
        paths[0].push(newPlacement);
    }


    return paths;
};

const knightPath = (pieces, piece, placement) =>{
    let paths = [[],[]];
    let placementChar = placement.slice(0,1);
    let placementNumber = parseInt(placement.slice(1));
    //2 up
    let newPlacementNumber = placementNumber + 2;
    let newPlacementLetter = [String.fromCharCode(placementChar.charCodeAt(0) - 1), String.fromCharCode(placementChar.charCodeAt(0) + 1)];
    for (let i=0; i <2; i++){
        let newPlacement = newPlacementLetter[i] + newPlacementNumber.toString();
        let isBlocked = isBlocking(pieces, newPlacement, piece.color);
        if (isBlocked.type) {
            if(isBlocked.color) {
                paths[1].push(newPlacement);
            }
        }
        else{
            paths[0].push(newPlacement);
        }
    }
    //2 down
    newPlacementNumber = placementNumber - 2;
    newPlacementLetter = [String.fromCharCode(placementChar.charCodeAt(0) - 1), String.fromCharCode(placementChar.charCodeAt(0) + 1)];
    for (let i=0; i <2; i++){
        let newPlacement = newPlacementLetter[i] + newPlacementNumber.toString();
        let isBlocked = isBlocking(pieces, newPlacement, piece.color);
        if (isBlocked.type) {
            if(isBlocked.color) {
                paths[1].push(newPlacement);
            }
        }
        else{
            paths[0].push(newPlacement);
        }
    }
    //2 left
    newPlacementLetter =  String.fromCharCode(placementChar.charCodeAt(0) - 2);
    newPlacementNumber = [(placementNumber-1), (placementNumber+1)];
    for (let i=0; i <2; i++){
        let newPlacement = newPlacementLetter + newPlacementNumber[i].toString();
        let isBlocked = isBlocking(pieces, newPlacement, piece.color);
        if (isBlocked.type) {
            if(isBlocked.color) {
                paths[1].push(newPlacement);
            }
        }
        else{
            paths[0].push(newPlacement);
        }
    }
    //2 right
    newPlacementLetter =  String.fromCharCode(placementChar.charCodeAt(0) + 2);
    newPlacementNumber = [(placementNumber-1), (placementNumber+1)];
    for (let i=0; i <2; i++){
        let newPlacement = newPlacementLetter + newPlacementNumber[i].toString();
        let isBlocked = isBlocking(pieces, newPlacement, piece.color);
        if (isBlocked.type) {
            if(isBlocked.color) {
                paths[1].push(newPlacement);
            }
        }
        else{
            paths[0].push(newPlacement);
        }
    }

    return paths;

};

const queenPath = (pieces, piece, placement) =>{
    let paths = [[],[]];
    let rPath = rookPath(pieces, piece, placement);
    let bPath = bishopPath(pieces, piece, placement);
    paths[0] = _.concat(rPath[0], bPath[0]);
    paths[1] = _.concat(rPath[1], bPath[1]);

    return paths;
};

const kingPath = (pieces, piece, placement) =>{
    let paths = [[],[]];
    let placementChar = placement.slice(0,1);
    let placementNumber = parseInt(placement.slice(1));
    //each object holds the amount need to add to the letter and number.
    let pathAmountAdd = [{letter:-1, number:1},{letter:0, number:1},{letter:1, number:1},{letter:1, number:0},
        {letter:1, number:-1},{letter:0, number:-1},{letter:-1, number:-1}, {letter:-1, number:0}];
    for(let i = 0; i < 8; i++){
        let newPlacement = String.fromCharCode(placementChar.charCodeAt(0) + pathAmountAdd[i].letter)
            + (placementNumber + pathAmountAdd[i].number).toString();
        let isBlocked = isBlocking(pieces, newPlacement, piece.color);
        if (isBlocked.type) {
            if(isBlocked.color) {
                paths[1].push(newPlacement);
            }
        }
        else{
            paths[0].push(newPlacement);
        }
    }
    return paths;
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

const isBlocking = (pieces, placement, color) =>{
    if(placement in pieces ){
        if(!_.isEmpty(pieces[placement])){
            if(pieces[placement].color !== color){
                return {type: true, color: true}
            }
            else{
                return {type: true, color: false}
            }
        }
        return {type: false}
    }
    return {type: true}
};

export default rootReducer;
