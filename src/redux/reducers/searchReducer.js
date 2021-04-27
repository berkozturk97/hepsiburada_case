import * as types from '../types';

const initialState = {
    searchQuery: ''
}

export const searchReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SEARCH_NEW_QUERY:
            return {searchQuery: action.payload}
        default:
            return state;
    }
}