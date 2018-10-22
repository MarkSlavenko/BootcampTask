import { combineReducers } from 'redux'
/* eslint-disable */
import {
    CHANGE_PAGE,
    SET_TOTAL_PAGES,
    SET_LOADING,
    IS_EMPTY,
    SET_NEW_SHOWS,
    SET_URL,
} from '../constants/index.js';




export const initialState = {
    shows: [],
    loading: false,
    isEmpty: false,
    url: '',
    page: 1,
    totalPages: 'Calculation',
}



export const Query = (store = initialState, action) => {
    switch(action.type) {
        case CHANGE_PAGE :
            return {...store,
                page: action.page
            }
        case SET_TOTAL_PAGES :
            return {...store,
                totalPages: action.totalPages
            }
        case SET_LOADING :
            return {...store,
                loading: action.loading
            }
        case IS_EMPTY :
            return {...store,
                isEmpty: action.isEmpty
            }
        case SET_URL :
            return {...store,
                url: action.url
            }

        default :
            return store
    }
}

export const Content = (store = initialState, action) => {
    switch (action.type) {
        case SET_NEW_SHOWS :
            return {...store,
                shows: action.shows
            }
        default :
            return store
    }
}




export const rootReducer = combineReducers({
   query: Query,
   content: Content
})
