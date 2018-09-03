const SORT = 'SORT'
const PAGE = 'PAGE'
const SEARCH = 'SEARCH'
const CLEAR = 'CLEAR'

export function sortByValue(sortType) {
    return {
        type: SORT,
        payload:sortType,
    }
}

export function pageChange(Type) {
    return {
        type: PAGE,
        payload:Type,
    }
}

export function searchByValue(searchPhrase) {
    return {
        type: SEARCH,
        payload:searchPhrase,
    }
}

export function clearPage () {
    return {
        type: CLEAR
    }
}

