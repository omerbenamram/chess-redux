import * as actionTypes from "../constants/actionTypes";
import * as _ from 'lodash';
import {BLACK, WHITE} from "../constants/index";


export const paths = (state = {move: [], eat:[]}, action) => {
    switch(action.type){
        case actionTypes.CALCULATE_PATH:
            let nextState;
            switch (action.pieces[action.placement].type) {
                case 'Pawn':
                    nextState = pawnPath(action.pieces, action.pieces[action.placement], action.placement);
                    break;
                case 'Bishop':
                    nextState = bishopPath(action.pieces, action.pieces[action.placement], action.placement);
                    break;
                case 'Rook':
                    nextState = rookPath(action.pieces, action.pieces[action.placement], action.placement);
                    break;
                case 'Queen':
                    nextState = queenPath(action.pieces, action.pieces[action.placement], action.placement);
                    break;
                case 'Knight':
                    nextState = knightPath(action.pieces, action.pieces[action.placement], action.placement);
                    break;
                case 'King':
                    nextState = kingPath(action.pieces, action.pieces[action.placement], action.placement);
                    break;
                default:
                    break;
            }
            return nextState;
        case actionTypes.PIECE_TRY_EAT:
        case actionTypes.PIECE_MOVED:
            return {move: [], eat: []};
        default:
            return state
    }
};
const isPawnFirstMove = (placementSep, color) => {
    return ((color === BLACK && placementSep.number === '7') || (color === WHITE && placementSep.number === '2'));

};
const pawnEat = (placementSep, color) => {
    let newPlacementSep;
    if(color === BLACK){
        newPlacementSep = {...placementSep, number: parseNumber(placementSep, -1)};
    }
    else {
        newPlacementSep = {...placementSep, number: parseNumber(placementSep, 1)};
    }
    //addValues
    let eatPlacements = [-1, 1];

    return _.map(eatPlacements, (addValue) => {
    return {...newPlacementSep, letter: parseLetter(placementSep, addValue)}});

};
const pawnMove = (placementSep, color, addValue=1) => {
    if(color === BLACK){
        return {...placementSep, number: parseNumber(placementSep, -addValue)};
    }
    else {
       return {...placementSep, number: parseNumber(placementSep, addValue)};
    }

};
const parseLetter = (placementSep, numToAdd) => {
    return String.fromCharCode(placementSep.letter.charCodeAt(0) + numToAdd)
};
const parseNumber = (placementSep, numToAdd) => {
    return (parseInt(placementSep.number) + numToAdd).toString();
};
const rebuildPlacement = (placementSep) => {
    return  placementSep.letter + placementSep.number;
};
const separatePlacement = (placement) => {
    let placementSep =_.values(placement);
    return  {letter:placementSep[0], number:placementSep[1]};

};

export const pawnPath = (pieces, piece, placement) => {
    let paths = {move: [], eat: []};
    let placementSeparated = separatePlacement(placement);
    if(isPawnFirstMove(placementSeparated, piece.color)) {
        for(let i = 1; i<3; i++) {
            let newPlacementSep = pawnMove(placementSeparated, piece.color, i);
            if (isBlocking(pieces[rebuildPlacement(newPlacementSep)], piece.color).type) {
                break;
            }
            paths.move.push(rebuildPlacement(newPlacementSep));
        }
    }
    else {
        let newPlacementSep = pawnMove(placementSeparated, piece.color);
        if (!isBlocking(pieces[rebuildPlacement(newPlacementSep)], piece.color).type) {
            paths.move.push(rebuildPlacement(newPlacementSep));
        }
    }
    let eatPlacements = pawnEat(placementSeparated, piece.color);
     _.map(eatPlacements, (placementS) => {
        let rebuiltPlacement = rebuildPlacement(placementS);
        let isBlocked = isBlocking(pieces[rebuiltPlacement], piece.color);
        if(isBlocked.type && isBlocked.color) {paths.eat.push(rebuiltPlacement)}});

    console.log(paths);
    return paths;
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
export const isBlocking = (newPlacementPiece, color) =>{

    if(newPlacementPiece !== undefined ){
        if(newPlacementPiece.type !== null){
            if(newPlacementPiece.color !== color){
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


