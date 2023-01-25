//! API - запросы списка постов (100 штук) с сервера JsonPlaceholder

// пакет AXIOS (заменитель fetch, т.к. короче писать код) для работы с запросами на сервер
import axios from 'axios'; // так будет ошибка (дикомпозицией {}): ... {axios} from ...

export default class PostService {
    //! try ... catch перенсли в useFetching.jsx 
    // статичный (PostService.getAll), асинхронный метод
    static async getAll() { 
        // ! чтобы сгенерировать ошибку, нужно "подпортить" url: например
        //! const response = await axios.get('https://jsonplaceholder.typicode.com/12345posts');
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts'); // url взяли из "JSONPlaceholder": https://jsonplaceholder.typicode.com/guide/
            // получили и вернули список постов
            return response.data
    }
}