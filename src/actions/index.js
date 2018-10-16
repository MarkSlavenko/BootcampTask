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

export const setPage = page => {
    return({
        type: CHANGE_PAGE,
        page
    })
}

export const setMaxPage = maxPage => {
    return ({
        type: SET_MAX_PAGE,
        maxPage
    })
}

export const isLoading = loading => {
    return ({
        type: SET_LOADING,
        loading
    })
}

export const nothingFound = nothingFound => {
    return ({
        type: IS_NOTHING_FOUND,
        nothingFound
    })
}

export const setNewContent = content => {
    return({
        type: SET_NEW_CONTENT,
        content
    })
}

export const setUrl = url => {
    return({
        type: SET_URL,
        url
    })
}

export const setCategory = category => {
    return({
        type: SET_CATEGORY,
        category
    })
}

export const setQuery = query => {
    return({
        type: SET_QUERY,
        query
    })
}

export const setSort = sort => {
    return ({
        type: SET_SORT,
        sort
    })
}

export const loadContent = (url) => {
    return (dispatch, getState) => {
        dispatch(isLoading(true));
        // if (getState().otherContent.nothingFound) dispatch(nothingFound(false))
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'trakt-api-version': '2',
                'trakt-api-key': '24121afa0914eaddbfa752b63590b6021628bc7c3bbc374a4116963ccadefcdf',
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
            .then((data) => { // загрузка картинок
                const content = [...data];
                let i = 0;
                data.map((item, index) => {
                    fetch(`https://webservice.fanart.tv/v3/tv/${item.ids.tvdb}?api_key=408b22edfb0465364b031d789388adb3`)
                        .then((image) => {
                            image.json().then((imageUrl) => {
                                const newItem = Object.assign({}, item);
                                if (imageUrl.tvposter) { // Перебор большинства возможных значений нахождения Url картинки в JSON объекте
                                    newItem.url = imageUrl.tvposter[0].url;
                                } else if (imageUrl.clearlogo) {
                                    newItem.url = imageUrl.clearlogo[0].url;
                                } else if (imageUrl.hdtvlogo) {
                                    newItem.url = imageUrl.hdtvlogo[0].url;
                                } else if (imageUrl.status === 'error') {
                                    newItem.url = 'https://vignette.wikia.nocookie.net/citrus/images/6/60/No_Image_Available.png/revision/latest?cb=20170129011325';
                                } else {
                                    newItem.url = 'https://cs.pikabu.ru/post_img/big/2013/11/22/5/1385100645_1399473065.jpg';
                                }
                                content.splice(index, 1, newItem);
                                i++;
                                if (i === content.length){ // почему если обновлять много раз, то перерендерить реакт только 1 раз может (первый) и если убрать этот if то отобразиться только одна картинка
                                    dispatch(setNewContent(content))
                                    console.log(content)
                                    dispatch(isLoading(false));
                                }
                            });
                        });
                });
            });
    }
}

export const urlMaker = (url, category) => {
    return (dispatch) => {
        dispatch(setQuery(''))
        dispatch(setCategory(category));
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
        console.log(`${getState().otherContent.url}&page=${page}`);
        dispatch(loadContent(`${getState().otherContent.url}&page=${page}`))

    }
}

export const sortFun = (selector) => {
    return (dispatch, getState) => {
        const newContent = [...getState().mainContent.content];
        let newSort = {};
        if (getState().otherContent.sort.direction === 'up' && selector === getState().otherContent.sort.sortOn) {
            newSort = {
                sortOn: selector,
                direction: 'down',
            };
            if (selector === 'year') {
                newContent.sort((a, b) => {
                    if (a.year > b.year) return 1;
                    if (a.year < b.year) return -1;
                });
            } else if (selector === 'rating') {
                newContent.sort((a, b) => {
                    if (a.rating > b.rating) return 1;
                    if (a.rating < b.rating) return -1;
                });
            }
        } else {
            if (selector === 'year') {
                newContent.sort((a, b) => {
                    if (a.year > b.year) return -1;
                    if (a.year < b.year) return 1;
                });
            } else if (selector === 'rating') {
                newContent.sort((a, b) => {
                    if (a.rating > b.rating) return -1;
                    if (a.rating < b.rating) return 1;
                });
            }
            newSort = {
                sortOn: selector,
                direction: 'up',
            };
        }
        dispatch(setSort(newSort));
        dispatch(setNewContent(newContent));
    }
}