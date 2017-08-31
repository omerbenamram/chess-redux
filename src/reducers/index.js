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
      if(piece.color === 'B') {
           let placementChar = placement.slice(0,1);
                let placementNumber = parseInt(placement.slice(1));
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
          let placementChar = placement.slice(0,1);
          let placementNumber = parseInt(placement.slice(1));
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


const calculatePath = (pieces, piece, placement) => {
    let paths = [[],[]];
        switch (piece.type) {
            case 'Pawn':
                paths = pawnPath(pieces, piece, placement);
        }

    return paths;
};

const isBlocking = (pieces, placement, color) =>{
    if(placement in pieces ){
        if(!_.isEmpty(pieces[placement])){
            if(pieces[placement].color !== color){
                return {type: true, color: false}
            }
            else{
                return {type: true, color: true}
            }
        }
        return {type: false}
    }
    return {type: true}
};

export default rootReducer;
