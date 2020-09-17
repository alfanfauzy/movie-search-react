const TOKEN_STORAGE = 'movie_favorite'

export function getToken(){
    return JSON.parse(localStorage.getItem(TOKEN_STORAGE));
}

export function setToken(value){
    localStorage.setItem(TOKEN_STORAGE, JSON.stringify(value));
}