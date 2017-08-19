const chessBoard = (state = {}, action) => {
    switch (action.type) {
        case 'CELL_CLICKED':
            console.log('Cell Clicked');
            return state;
        default:
            return state
    }
};

export default chessBoard;
