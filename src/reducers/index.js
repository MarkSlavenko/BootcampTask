import { combineReducers } from 'redux'
import { sortReducer } from './Sort'

var shows;
const take_param = (param) => {
    var check =  JSON.parse(param)
    shows = check
}


const request_movies = () => {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://api.trakt.tv/calendars/all/shows/2018-01-01/2', false);

    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('trakt-api-version', '2');
    request.setRequestHeader('trakt-api-key', '50bdd2eaaf44ded248ade12837ff8a7a77e14add02efb9b0ef7edc034dab134a');

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            take_param(this.responseText)
        }
    };

    request.send();
}

request_movies()


export const initialState = {
    shows: shows,
    shows_pagination: shows.slice(0,30),
    clear_shows: shows,
    i:0,
}



export function startReducer(state = initialState, action) {
    switch (action.type) {
        case 'SORT': {
            switch (action.payload) {
                case 'SORT_BY_NAME':
                    return {...state, i: state.i=0, shows: state.shows.sort((a,b)=>a.show.title.localeCompare(b.show.title)), shows_pagination: state.shows.slice(0,30)}
                case 'SORT_BY_SEASON':
                    return {...state, i: state.i=0, shows: state.shows.sort((a,b)=>a.episode.season - b.episode.season), shows_pagination: state.shows.slice(0,30)}
                case 'SORT_BY_YEAR':
                    return {...state, i: state.i=0, shows: state.shows.sort((a,b)=>b.show.year - a.show.year), shows_pagination: state.shows.slice(0,30)}
        }}

        case 'PAGE': {
            switch (action.payload) {
                case 'PREV':
                    return {...state, i: state.i-=30, shows_pagination: state.shows.slice(state.i,state.i+30)}
                case 'NEXT':
                    return {...state, i: state.i+=30, shows_pagination: state.shows.slice(state.i,state.i+30)}
            }}

        case 'SEARCH':
        {
            state.shows=state.clear_shows
            state.shows = state.shows.filter(item=> {if(item.show.title.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1) return item})
            return {...state,
                i: state.i=0,
                shows_pagination: state.shows.slice(0, 30)}
        }

        case 'CLEAR': {
            state.shows=state.clear_shows
            return {...state,
                i: state.i=0,
                shows_pagination: state.shows.slice(0, 30)}
        }

        default:
            return state
}}

export const rootReducer = combineReducers({
    root: startReducer,
})
