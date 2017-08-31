

const chessBoard = (state = {}, action) => {
    switch (action.type) {
        case 'CELL_CLICKED':
            console.log(action.pieceType + ' Clicked at ' + action.placement);

            return state;
        default:
            return state
    }
};

export default chessBoard;
