const SEARCH = 'SEARCH'

export function searchByValue(searchPhrase) {
    return {
        type: SEARCH,
        payload:searchPhrase,
    }
}