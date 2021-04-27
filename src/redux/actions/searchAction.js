import * as types from '../types';

export function setSearchQuery(data) {
    return {
        type: types.SEARCH_NEW_QUERY,
        payload: data,
    }
}