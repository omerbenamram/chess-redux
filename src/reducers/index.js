const rootReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CELL_CLICKED':
            console.log(action.pieceType + ' Clicked at ' + action.placement);
            //maybe I can delegate it to another reducer
            //move
            if (state.selected !== '' && state.selected.pieceType.type !== undefined  && action.pieceType.type === undefined)
            {
                let formerPlacement = state.selected.placement;
                console.log(action.placement)
                let newPlacement = action.placement;
                let newPlacementPiece = state.pieces[state.selected.placement]
                return {...state, pieces: Object.assign({}, state.pieces, {[formerPlacement]:{},
                    [newPlacement]: {type: newPlacementPiece.type, color: newPlacementPiece.color}}),
                    selected: {placement: action.placement, pieceType: action.pieceType}};
            }
            else{
                return {...state, selected: {placement: action.placement, pieceType: action.pieceType}};
            }

        default:
            return state;
    }
};

export default rootReducer;
