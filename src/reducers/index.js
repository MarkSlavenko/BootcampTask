import { combineReducers } from 'redux'
/* eslint-disable */
import {
    CHANGE_PAGE,
    SET_MAX_PAGE,
    SET_LOADING,
    IS_NOTHING_FOUND,
    SET_NEW_CONTENT,
    SET_URL,
    SET_CATEGORY,
} from '../constants/index.js';




export const initialState = {
    content: [],
    loading: false,
    nothingFound: false,
    url: '',
    category: 'Action',
    page: 1,
    maxPage: 'Calculation',
}



export const otherContent = (store = initialState, action) => {
    switch(action.type) {
        case CHANGE_PAGE :
            return {...store,
                page: action.page
            }
        case SET_MAX_PAGE :
            return {...store,
                maxPage: action.maxPage
            }
        case SET_LOADING :
            return {...store,
                loading: action.loading
            }
        case IS_NOTHING_FOUND :
            return {...store,
                nothingFound: action.nothingFound
            }
        case SET_URL :
            return {...store,
                url: action.url
            }
        case SET_CATEGORY :
            return {...store,
                category: action.category
            }

        default :
            return store
    }
}

export const mainContent = (store = initialState, action) => {
    switch (action.type) {
        case SET_NEW_CONTENT :
            return {...store,
                content: action.content
            }
        default :
            return store
    }
}




export const rootReducer = combineReducers({
   other: otherContent,
   main: mainContent
})
