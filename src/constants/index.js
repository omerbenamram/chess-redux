import  * as _ from 'lodash'
export const initState = {
    selected: '',
    turn: 'W',
    pieces: {
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
    },
    paths: [[],[]]
};
export const pawnPath = (pieces, piece, placement) => {
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
export const bishopPath = (pieces, piece, placement) => {
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
export const rookPath = (pieces, piece, placement) => {
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
export const knightPath = (pieces, piece, placement) =>{
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
export const queenPath = (pieces, piece, placement) =>{
    let paths = [[],[]];
    let rPath = rookPath(pieces, piece, placement);
    let bPath = bishopPath(pieces, piece, placement);
    paths[0] = _.concat(rPath[0], bPath[0]);
    paths[1] = _.concat(rPath[1], bPath[1]);

    return paths;
};
export const kingPath = (pieces, piece, placement) =>{
    //might need to add a way to not let place which  result in getting checked
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
export const isBlocking = (pieces, placement, color) =>{
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
