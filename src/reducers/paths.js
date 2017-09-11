import * as actionTypes from "../constants/actionTypes";
import * as _ from 'lodash';
import {BLACK, WHITE} from "../constants/index";
import {findKingPlacement} from "./threats";


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
        case actionTypes.GET_CHECKED:
        case actionTypes.CHECK:
            let allPaths = _.map(state, (placement)=>{

                switch (action.pieces[placement].type) {
                    case 'Pawn':
                        return {placement, paths:pawnPath(action.pieces, action.pieces[placement], placement)};
                    case 'Bishop':
                        return {placement, paths:bishopPath(action.pieces, action.pieces[placement], placement)};
                    case 'Rook':
                        return {placement, paths:rookPath(action.pieces, action.pieces[placement], placement)};
                    case 'Queen':
                        return {placement, paths:queenPath(action.pieces, action.pieces[placement], placement)};
                    case 'Knight':
                        return {placement, paths:knightPath(action.pieces, action.pieces[placement], placement)};
                    case 'King':
                        return {placement, paths:kingPath(action.pieces, action.pieces[placement], placement)};

                    default:
                        break;
                }

            });
            return   piecesKingChecked(allPaths, findKingPlacement(action.pieces, action.color));

        case actionTypes.PIECE_TRY_EAT:
        case actionTypes.PIECE_MOVED:
            return {move: [], eat: []};
        default:
            return state
    }
};


const piecesKingChecked = (allPaths, kingPlacement) =>{
    return _.map(_.filter(allPaths, (value) =>{
        if(value.paths.eat.includes(kingPlacement)){
            return true
        }
    }), (value) => {
        return value.placement;
    });
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
const rookBishopDirectionPathCal = (paths={move: [], eat: []} , pieces, placementSep,color, dir) => {
    let directions = {
        upRight: {letter: 1, number: 1}, downRight: {letter: 1, number: -1},
        upLeft: {letter: -1, number: 1}, downLeft: {letter: -1, number: -1},
        right:{letter:1, number:0}, left:{letter:-1, number:0}, up:{letter:0, number:1},
        down:{letter:0, number:-1}};
    let newPlacementSep = {...placementSep};
    let newPaths = {...paths};

    for (let i = 1; i < 8; i++) {

        newPlacementSep = {letter: (parseLetter(placementSep, (i * directions[dir].letter))),
            number: (parseNumber(placementSep, (i * directions[dir].number)))};
        let isBlocked = isBlocking(pieces[rebuildPlacement(newPlacementSep)], color);
        if (isBlocked.type) {
            if (isBlocked.color) {
                newPaths.eat.push(rebuildPlacement(newPlacementSep));
            }
            break;
        }
        newPaths.move.push(rebuildPlacement(newPlacementSep));
    }
    return newPaths;
};
const knightDirectionPathCal = (paths={move: [], eat: []} , pieces, placementSep,color, dir) => {
    //the first direction in each is the big step (2 squares)
    let directions = { upLeft:{letter:-1,number:2}, upRight:{letter:1,number:2}, downLeft:{letter:-1,number:-2}, downRight:{letter:1,number:-2},
        leftUp:{letter:-2,number:1}, leftDown:{letter:-2,number:-1}, rightUp:{letter:2,number:1}, rightDown:{letter:2,number:-1}};
    let newPaths = {...paths};

    let newPlacementSep = {letter: (parseLetter(placementSep,  directions[dir].letter)),
        number: (parseNumber(placementSep, directions[dir].number))};
    let isBlocked = isBlocking(pieces[rebuildPlacement(newPlacementSep)], color);
    if (isBlocked.type) {
        if(isBlocked.color) {
            newPaths.eat.push(rebuildPlacement(newPlacementSep));
        }
    }
    else{
        newPaths.move.push(rebuildPlacement(newPlacementSep));
    }
    return newPaths;
};

const parseLetter = (placementSep, numToAdd) => {
    return String.fromCharCode(placementSep.letter.charCodeAt(0) + numToAdd)
};
const parseNumber = (placementSep, numToAdd) => {
    return (parseInt(placementSep.number, 10) + numToAdd).toString();
};
export const rebuildPlacement = (placementSep) => {
    return  placementSep.letter + placementSep.number;
};
export const separatePlacement = (placement) => {
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

    return paths;
};
export const bishopPath = (pieces, piece, placement) => {
    let paths = {move: [], eat: []};
    let placementSeparated = separatePlacement(placement);
    let dir = ['upRight', 'downRight', 'upLeft', 'downLeft'];
    _.forEach(dir, (value) => {
        paths = {...rookBishopDirectionPathCal(paths,pieces,placementSeparated,piece.color,value)}});
    return paths;
};
export const rookPath = (pieces, piece, placement) => {
    let paths = {move: [], eat: []};
    let placementSeparated = separatePlacement(placement);
    let dir = ['right', 'up', 'left', 'down'];
    _.forEach(dir, (value) => {
        paths = {...rookBishopDirectionPathCal(paths,pieces,placementSeparated,piece.color,value)}});
    return paths;
};
export const knightPath = (pieces, piece, placement) =>{
    let paths = {move: [], eat: []};
    let placementSeparated = separatePlacement(placement);
    let dir = ['upRight', 'downRight', 'upLeft', 'downLeft', 'leftUp', 'leftDown', 'rightUp', 'rightDown'];
    _.forEach(dir, (value) => {
        paths = {...knightDirectionPathCal(paths,pieces,placementSeparated,piece.color,value)}});
    return paths;

};
export const queenPath = (pieces, piece, placement) =>{
    let paths = {move: [], eat: []};
    let rPath = rookPath(pieces, piece, placement);
    let bPath = bishopPath(pieces, piece, placement);
    paths.move = _.concat(rPath.move, bPath.move);
    paths.eat = _.concat(rPath.eat, bPath.eat);

    return paths;
};
export const kingPath = (pieces, piece, placement) =>{
    let paths = {move: [], eat: []};
    let placementSeparated = separatePlacement(placement);
    //each object holds the amount need to add to the letter and number.
    let pathAmountAdd = [{letter:-1, number:1},{letter:0, number:1},{letter:1, number:1},{letter:1, number:0},
        {letter:1, number:-1},{letter:0, number:-1},{letter:-1, number:-1}, {letter:-1, number:0}];

    _.forEach(pathAmountAdd, (value) => {
        let newPlacementSep = {letter: (parseLetter(placementSeparated,  value.letter)),
            number: (parseNumber(placementSeparated, value.number))};
        let isBlocked = isBlocking(pieces[rebuildPlacement(newPlacementSep)], piece.color);
        if (isBlocked.type) {
            if(isBlocked.color) {
                paths.eat.push(rebuildPlacement(newPlacementSep));
            }
        }
        else{
            paths.move.push(rebuildPlacement(newPlacementSep));
        }
    });
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


