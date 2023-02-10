import React from 'react';
//  Хук useParams - возвращает объект пар ключ/значение динамических параметров из текущего URL-адреса, 
//  которые были сопоставлены <Route path>. 
//  Дочерние маршруты наследуют все параметры родительских маршрутов.
// Подробнее: https://reactrouter.com/en/main/hooks/use-params
import { useParams } from 'react-router-dom';

import axios from 'axios'; // так будет ошибка (дикомпозицией {}): ... {axios} from ...
// import PostService from '../API/PostService'
import { useEffect } from 'react';
import { useState } from 'react';
import { useFetching } from '../hooks/useFetching';
// пока использовал шаблон поста из PostItem - где кнопки не действительны
import PostItem from '../components/PostItem';



const PostIdPage = () => {
    //? МОИ варинат
    //console.log(window.location.href); //http://localhost:3000/posts/1
    // вариант автора (хук от react-router-dom):
    const idPost = useParams(); 
    // console.log(idPost) // объект {id : "1"}
    // console.log(idPost.id) // 1 (параметр: id из URL)


    //! состояние: один пост:
    const [post, setPost] = useState(''
       // { id: 1, title: 'Пост по-умолчанию (заглушка)', body: 'Пост по-умолчанию Пост по-умолчанию' },
    )
    //console.log(post)


    //! кастомных хук, функция шаблона запроса на сервер (файл useFetching.jsx):
    const [fetching, isPostLoading, postError] = useFetching(async () => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${idPost.id}`); // url взяли из "JSONPlaceholder": https://jsonplaceholder.typicode.com/guide/
    
    setPost(response.data)
    //setPost({ id: 3, title: 'testSearch A-JavaScript 1', body: 'B-Description bodybodybodybodybodybodybody' })
    console.log(response.data)
    })

    //useEffect - НЕ должен ничего возращать (иначе ошибка), так будет ошибка () => fetching()
    useEffect(
        () => {fetching()} 
        ,
        [] 
      )

    return (
        <div>
            <h1>Страница одного поста</h1>
            {/*//! пока использовал шаблон поста из PostItem - где кнопки не действительны*/}
            <PostItem post={post} key={post.id} id={post.id} index={post.id} remove={post.id}/>
        </div>
    );
};

export default PostIdPage;