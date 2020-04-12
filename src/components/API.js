let baseURL = 'https://api.themoviedb.org/';
let apiKey = 'api_key=d436f1528135527ad00e653f3adfebe8'

export default class API {
    static baseURL = baseURL;

    static request(url, method = 'GET', body = null) {
            let access_token = '';
            console.log('final url -> ', baseURL + url)
            return fetch(baseURL + url + apiKey, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + (access_token ? access_token : null)
                },
                body: body === null ? null : JSON.stringify(body)
            });
    }

    static getMovieList(pageNo) {
        return this.request(`4/list/1?page=${pageNo}&`, 'GET');
    }
    static getMovieDetail(id) {
        return this.request(`3/movie/${id}?`, 'GET');
    }
    static searchMovie(searchTerm, pageNo) {
        return this.request(`3/search/movie?language=en-US&query=${searchTerm}&page=${pageNo}&include_adult=false&`, 'GET');
    }
   
}