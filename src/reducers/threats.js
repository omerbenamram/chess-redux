import * as actionTypes from "../constants/actionTypes";
import * as _ from 'lodash';
import {BLACK, WHITE} from "../constants/index";
import {separatePlacement} from "./paths";


export const threats = (state = [], action) => {
    switch(action.type){
        case actionTypes.CHECK:
            return  getThreats(action.pieces, action.color);
        case actionTypes.GET_CHECKED:
            return  getThreats(action.pieces, action.color)
        default:
            return state
    }
};

const getThreats = (pieces, colorToCheck) => {
    let kingPlacement = findKingPlacement(pieces,colorToCheck);
    let enemyColor = colorToCheck === WHITE ? BLACK : WHITE;
    let threatPlacements =[];
    _.forEach(pieces, (piece, key)=>{
        if(piece.color === enemyColor){
            if(checkPiece(key, piece, kingPlacement)){
                threatPlacements.push(key);
            }
        }
    });
    return threatPlacements
};

export const findKingPlacement = (pieces, kingColor) => {
    let kingsPlacement = '';
    _.forEach(pieces, (piece, key) => {
        if(piece.color === kingColor && piece.type === 'King'){
            kingsPlacement = key
        }
    });
    return kingsPlacement
};

const checkPiece = (placement, piece, enemyKingPlacement) => {
    let isThreatening = false;
    switch (piece.type) {
        case 'Pawn':
            isThreatening = pawnThreat(placement, enemyKingPlacement);
            break;
        case 'Bishop':
            isThreatening = bishopThreat(placement, enemyKingPlacement);
            break;
        case 'Rook':
            isThreatening = rookThreat(placement, enemyKingPlacement);
            break;
        case 'Queen':
            isThreatening = queenThreat(placement, enemyKingPlacement);
            break;
        case 'Knight':
            isThreatening = knightThreat(placement, enemyKingPlacement);
            break;
        case 'King':
            //a king can never threaten other team's king
            break;
        default:
            break;
    }
    return isThreatening
};

const pawnThreat = (placement, enemyKingPlacement) =>{
    let placementsAbsDiff = placementsAbsoluteDiff(placement, enemyKingPlacement);
    return (placementsAbsDiff.letterDiff === 1 && placementsAbsDiff.numberDiff === 1)
};
const bishopThreat = (placement, enemyKingPlacement) =>{
    let placementAbsDiff = placementsAbsoluteDiff(placement, enemyKingPlacement);
    return (placementAbsDiff.letterDiff === placementAbsDiff.numberDiff);
};
const rookThreat = (placement, enemyKingPlacement) =>{
    let placementAbsDiff = placementsAbsoluteDiff(placement, enemyKingPlacement);
    return (placementAbsDiff.letterDiff === 0 || placementAbsDiff.numberDiff === 0);
};
const queenThreat = (placement, enemyKingPlacement) =>{
    return (bishopThreat(placement, enemyKingPlacement) || rookThreat(placement, enemyKingPlacement))
};
const knightThreat = (placement, enemyKingPlacement) =>{
    let placementAbsDiff = placementsAbsoluteDiff(placement, enemyKingPlacement);
    return ((placementAbsDiff.letterDiff === 2 && placementAbsDiff.numberDiff === 1)
        || (placementAbsDiff.letterDiff === 1 && placementAbsDiff.numberDiff === 2))
};
const placementsAbsoluteDiff = (threatenPlacement, kingPlacement) => {
    let threatenPlacementSep = separatePlacement(threatenPlacement);
    let kingPlacementSep = separatePlacement(kingPlacement);
    return {letterDiff:Math.abs(placementsLetterDiff(threatenPlacementSep.letter, kingPlacementSep.letter)),
        numberDiff: Math.abs(placementsNumberDiff(threatenPlacementSep.number, kingPlacementSep.number))}

};
const placementsLetterDiff = (firstLetter, secondLetter) =>{
    return   firstLetter.charCodeAt(0) - secondLetter.charCodeAt(0);
};
const placementsNumberDiff = (firstNum, secondNum) =>{
    //they come as strings
    return parseInt(firstNum) - parseInt(secondNum)
};