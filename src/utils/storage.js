const TOKEN_STORAGE_IMDBID = 'IMDBID_FAVORITE';
const TOKEN_STORAGE_MOVIE = 'MOVIE_FAVORITE';

export function getImdbIdFavoriteToken(){
    return JSON.parse(localStorage.getItem(TOKEN_STORAGE_IMDBID));
}

export function setImdbIdFavoriteToken(value){
    localStorage.setItem(TOKEN_STORAGE_IMDBID, JSON.stringify(value));
}

export function setMovieFavoriteToken(valueId, value){
    localStorage.setItem(TOKEN_STORAGE_MOVIE + (valueId) , JSON.stringify(value));
}

export function getMovieFavoriteToken(valueId){
    return JSON.parse(localStorage.getItem(TOKEN_STORAGE_MOVIE + (valueId)));
}

export function removeMovieFavoriteToken(valueId){
    localStorage.removeItem(TOKEN_STORAGE_MOVIE + (valueId));
}