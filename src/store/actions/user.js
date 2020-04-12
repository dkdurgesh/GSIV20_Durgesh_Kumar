import{
GET_MOVIE_LIST_START,
GET_MOVIE_LIST_SUCCESS,
GET_MOVIE_DETAIL_START,
GET_MOVIE_DETAIL_SUCCESS,
} from '../ActionTypes';
import API from '../../components/API';

export const getMovieList = (pageNo, lazyLoading, dispatch) =>{
    dispatch({
        type:GET_MOVIE_LIST_START,
        lazyLoading:lazyLoading
    });
    API.getMovieList(pageNo)
    .then(res => res.json())
        .then(jsonRes => {
            // console.log('Response', JSON.stringify(jsonRes));
                dispatch({
                    type: GET_MOVIE_LIST_SUCCESS,
                    payload: jsonRes.results,
                    lazyLoading: lazyLoading
                })
        })
};

export const getMovieDetail = (movieId, dispatch) =>{
    dispatch({
        type:GET_MOVIE_DETAIL_START
    });
    API.getMovieDetail(movieId)
    .then(res => res.json())
        .then(jsonRes => {
            // console.log('Response', JSON.stringify(jsonRes));
                dispatch({
                    type: GET_MOVIE_DETAIL_SUCCESS,
                    payload: jsonRes,
                })
        })
};

export const searchMovie = (searchTerm, pageNo, lazyLoading, dispatch) =>{
    dispatch({
        type:GET_MOVIE_LIST_START,
         lazyLoading:lazyLoading

    });
    API.searchMovie(searchTerm, pageNo)
    .then(res => res.json())
        .then(jsonRes => {
             console.log('Response', JSON.stringify(jsonRes));
                dispatch({
                    type: GET_MOVIE_LIST_SUCCESS,
                    payload: jsonRes.results,
                    lazyLoading: lazyLoading
                })
        })
};
