/* eslint-disable */
import {
    CHANGE_PAGE,
    SET_TOTAL_PAGES,
    SET_LOADING,
    IS_EMPTY,
    SET_NEW_SHOWS,
    SET_URL,
} from '../constants/index.js';

export const setPage = page => {
    return({
        type: CHANGE_PAGE,
        page
    })
}

export const setMaxPage = totalPages => {
    return ({
        type: SET_TOTAL_PAGES,
        totalPages
    })
}

export const isLoading = loading => {
    return ({
        type: SET_LOADING,
        loading
    })
}

export const nothingFound = isEmpty => {
    return ({
        type: IS_EMPTY,
        isEmpty
    })
}

export const setNewContent = shows => {
    return({
        type: SET_NEW_SHOWS,
        shows
    })
}

export const setUrl = url => {
    return({
        type: SET_URL,
        url
    })
}




export const loadContent = (url) => {
    return (dispatch, getState) => {
        dispatch(isLoading(true));
        if (getState().query.isEmpty) dispatch(nothingFound(false))
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'trakt-api-version': '2',
                'trakt-api-key': '24121afa0914eaddbfa752b63590b6021628bc7c3bbc374a4116963ccadefcdf',
            },
        })
            .then((response) => {
                dispatch(setMaxPage(response.headers.get('X-Pagination-Page-Count')))
                return response.json().then((arr) => {
                    if (arr.length === 0) {
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
            .then((data) => {
    const content = [...data];

    dispatch(setNewContent(content))
    dispatch(isLoading(false));

});
}


}

export const urlMaker = (url) => {
    return (dispatch) => {
        dispatch(setPage(1));
        dispatch(setUrl(url));
        const fullUrl = `${url}&page=1`;
        console.log(fullUrl);
        dispatch(loadContent(fullUrl));
    }
}

export const changePage = (page) => {
    return (dispatch, getState) => {
        dispatch(setPage(page));
        console.log(`${getState().query.url}&page=${page}`);
        dispatch(loadContent(`${getState().query.url}&page=${page}`))
    }
}

