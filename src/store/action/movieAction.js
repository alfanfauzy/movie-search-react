export const addResultSearchMovie = (value) => {
    return({
        type: "RESULT_SEARCH_MOVIE",
        payload: value
    })
}

export const addSearchMovieById = (value) => {
    return({
        type: "SEARCH_MOVIE_BY_ID",
        payload: value
    })
}

export const addMovieFavorite = (value) => {
    return({
        type: "ADD_MOVIE_FAVORITE",
        payload: value
    })
}