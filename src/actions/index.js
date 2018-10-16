/* eslint-disable */
import {
    CHANGE_PAGE,
    SET_MAX_PAGE,
    SET_LOADING,
    IS_NOTHING_FOUND,
    SET_NEW_CONTENT,
    SET_URL,
    SET_CATEGORY,
    SET_QUERY,
    SET_SORT
} from '../constants/index.js';

export const isLoading = loading => {
    return ({
        type: SET_LOADING,
        loading
    })
}

export const setNewContent = content => {
    return({
        type: SET_NEW_CONTENT,
        content
    })
}

export const nothingFound = nothingFound => {
    return ({
        type: IS_NOTHING_FOUND,
        nothingFound
    })
}

export const loadContent = (url) => {
    return (dispatch, getState) => {
        dispatch(isLoading(true));
        if (getState().otherContent.nothingFound) dispatch(nothingFound(false))
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'trakt-api-version': '2',
                'trakt-api-key': '50bdd2eaaf44ded248ade12837ff8a7a77e14add02efb9b0ef7edc034dab134a',
            },
        })
            .then((response) => {
                dispatch(setMaxPage(response.headers.get('X-Pagination-Page-Count')))
                return response.json().then((arr) => { // загрузка контента
                    if (arr.length === 0) { // если ничего не найдено
                        dispatch(isLoading(false));
                        dispatch(nothingFound(true));
                        return []
                    }
                    let newArrContent = [];
                    if(arr[0].show) {
                        arr.map((item) => {
                            newArrContent.push(item.show);
                        })
                    } else{
                        newArrContent = [...arr];
                    }
                    return newArrContent;
                });
            })
    }
}