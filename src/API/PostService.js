//! API - запросы списка постов (100 штук) с сервера JsonPlaceholder

// пакет AXIOS (заменитель fetch, т.к. короче писать код) для работы с запросами на сервер
import axios from 'axios'; // так будет ошибка (дикомпозицией {}): ... {axios} from ...

export default class PostService {
    // статичный (PostService.getAll), асинхронный метод
    static async getAll() { 
        // хоть не принято вылавливать ошибки на уровне сервиса, но для легкого примера - сделаем
        try {
            // запрос на сервер, с использованием AXIOS вместо Fetch 
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts'); // url взяли из "JSONPlaceholder": https://jsonplaceholder.typicode.com/guide/
            // получили и вернули список постов
            return response.data
        } catch (e) {
            // ошибки принято выбрасывать в глобалку, через "throw", но мы просто посмотрим в консоле
            console.log(e); 
        }
    }
}