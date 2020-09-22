import {createStore} from 'redux';

const globalState = {
    movieFavorite : [],
    resultSearchMovie: [],
    searchMovieById: [],
}

// Reducer
const rootReducer = (state = globalState, action) => {
    const {type, payload} = action;
    switch(type){
        case "RESULT_SEARCH_MOVIE":
            return{
                ...state,
                resultSearchMovie : payload
            }
        case "SEARCH_MOVIE_BY_ID":
            return{
                ...state,
                searchMovieById : payload
            }
        case "ADD_MOVIE_FAVORITE":
            return{
                ...state,
                movieFavorite : payload
            }
        default:
            return{
                ...state
            }
    }
}

// Store
const movieRedux = createStore(rootReducer);

export default movieRedux;