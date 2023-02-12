// API - запросы списка постов (100 штук) с сервера JsonPlaceholder

// пакет AXIOS (заменитель fetch, т.к. короче писать код) для работы с запросами на сервер
import axios from 'axios'; // так будет ошибка (дикомпозицией {}): ... {axios} from ...


export default class PostService {
    // try ... catch перенсли в useFetching.jsx 
    // статичный (PostService.getAll), асинхронный метод
    static async getAll(limit = 10, page = 1) { 
        // чтобы сгенерировать ошибку, нужно "подпортить" url: например
        // const response = await axios.get('https://jsonplaceholder.typicode.com/12345posts');

        // пример url-запроса с параметрами: лимит и страницы 
        // const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10&_page=3');

            const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
                {
                    params: { //! axios - сам подставит в Url указанные параметры (limit, page), подробнее: https://axios-http.com/ru/docs/req_config 
                        _limit: limit, //
                        _page: page,

                }
            }); // url взяли из "JSONPlaceholder": https://jsonplaceholder.typicode.com/guide/
            
            
            // получили и вернули список постов
            //return response.data // раньше передовали сразу данные, теперь тело отвтева полностью с headers в то числе
            return response;
    }

    //! для ОДНОГО ПОСТА (PostIdPage.jsx)
    static async getById(id) { // id - из useParams() (PostIdPage.jsx)
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id);
        return response;
    }

}