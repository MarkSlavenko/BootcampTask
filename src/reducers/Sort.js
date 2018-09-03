
// export function sortReducer(state = initialState, action) {
//     switch (action.type) {
//         case 'SORT_BY_NAME':
//         return {...state, shows: state.shows.sort((a,b)=>a.show.title.localeCompare(b.show.title)), shows_pagination: state.shows.slice(0,30)}
//
//             case 'SORT_BY_SEASON':
//              return {...state, shows: state.shows.sort((a,b)=>a.episode.season - b.episode.season), shows_pagination: state.shows.slice(0,30)}
//
//             case 'SORT_BY_YEAR':
//              return {...state, shows: state.shows.sort((a,b)=>b.show.year - a.show.year), shows_pagination: state.shows.slice(0,30)}
//
//         default:
//             return state
//     }
// }

//     this.setState({shows_pagination : this.state.work_shows.slice(0,30), i: 0})