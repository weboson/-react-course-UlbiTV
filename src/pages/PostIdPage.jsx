// ! компонент - старница одного поста и комментрий к ниму
import React from 'react';

//  Хук useParams - возвращает объект пар ключ/значение динамических параметров из текущего URL-адреса, 
//  которые были сопоставлены <Route path>. 
//  Дочерние маршруты наследуют все параметры родительских маршрутов.
// Подробнее: https://reactrouter.com/en/main/hooks/use-params
import { useParams } from 'react-router-dom';
// для получения метода axios - запроса (getById)
import PostService from '../API/PostService'
// шаблон с try...catch с вызовом колбека, в котором вызов axios-запроса (PostService.jsx)
import { useFetching } from '../hooks/useFetching';

import { useEffect } from 'react';
import { useState } from 'react';
// индикатор загрузки
import Loader from '../components/UI/Loader/Loader';


const PostIdPage = () => {

    // -- useParams -- 
    const params = useParams(); 
    //console.log(params) // объект {id : "1"} - id - это любое имя, после : внутри тегах <Route exact path="posts/:id" element={<PostIdPage />}
    //console.log(params.id) // 1 (параметр: id из URL)
    
    // состояние #1: один пост:
    const [post, setPost] = useState({}
        // { id: 1, title: 'Пост по-умолчанию (заглушка)', body: 'Пост по-умолчанию Пост по-умолчанию' },
        )
   //! состояние #2: комментарии:
   const [comments, setComments] = useState([])

   // получение одного поста
   // кастомных хук useFetching.jsx, функция шаблона с try...catch для axios-запроса (PostService.getById()) на сервер (файл useFetching.jsx):
    const [fetchPostId, isLoading, error] = useFetching( async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data)
    })

   //! получение комментарий
   // кастомных хук useFetching.jsx, функция шаблона с try...catch для axios-запроса (PostService.getById()) на сервер (файл useFetching.jsx):
   const [fetchComment, isComLoading, comError] = useFetching( async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data)
    })

    //useEffect - НЕ должен ничего возращать (иначе ошибка), так будет ошибка () => fetching()
    useEffect(() => {
        fetchPostId(params.id); // пост
        fetchComment(params.id); //! комментарии
    }, [])

    return (
        <div>
            <h1>Вы открыли страницу поста с ID = {params.id}</h1>
            {isLoading
                ? <Loader />
                : <div><h2>{post.id}. {post.title}</h2><p>{post.body}</p></div>
                
            
            }
            {/* //! рендер комментарии */}
            <h1>Комментарии: </h1>
            {isComLoading
                ? <Loader />
                : <div>
                    {comments.map((comm) => 
                    <div style={{marginTop: 15}} key={comm.id}>
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>
                    )}
                  </div>
            }
        </div>
    );
};

export default PostIdPage;