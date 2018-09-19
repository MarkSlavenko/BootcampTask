const SORT = 'SORT'

export function sortByValue(sortType) {
    return {
        type: SORT,
        payload:sortType,
    }
}