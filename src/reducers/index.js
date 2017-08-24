const rootReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CELL_CLICKED':
            console.log('Cell Clicked at ' + action.placement);

            return {...state, selected: action.placement};
        default:
            return state;
    }
};

export default rootReducer;
