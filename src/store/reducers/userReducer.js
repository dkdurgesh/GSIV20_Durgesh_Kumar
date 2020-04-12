import * as actionTypes from '../ActionTypes';

const initialState ={
    loading: false,
    movieList:[],
    movieDetail:null,
    searchResult:[]
}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_MOVIE_LIST_START: {
            let data = []
            
            return {
                ...state,
                loading: true,
                movieList: !action.lazyLoading ? [] : [...state.movieList]
            }
        }
        case actionTypes.GET_MOVIE_LIST_SUCCESS: {
            let data=[]
            if(action.lazyLoading){
                data = [...state.movieList, ...action.payload]
            }else{
                data = action.payload
            }
            return {
                ...state,
                loading: false,
                movieList: data
            }
        }
        
        case actionTypes.GET_MOVIE_DETAIL_START: {
            return {
                ...state,
                loading: true,
            }
        }
        case actionTypes.GET_MOVIE_DETAIL_SUCCESS: {
            return {
                ...state,
                loading: false,
                movieDetail: action.payload
            }
        }
        default:
            return state
    }
}