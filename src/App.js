import React from 'react';
// импортировал useRef
import { useState, useRef } from 'react';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

import './styles/App.css';

function App() {
//состояние в котором, объект с ключами / значениями, котороые ПО-УМОЛЧАНИЮ (чтобы отобразить пример списка постов)
  const [posts, setPosts] = useState([
    // значение(я) массива posts по-умолчанию
    {id: 1, title: 'JavaScript 1', body: 'Description'},
    {id: 2, title: 'JavaScript 2', body: 'Description'},
    {id: 3, title: 'JavaScript 3', body: 'Description'},
  ])
  
//! Вместо нескольких состояний, ...
  // const [title, setTitle] = useState('');
  // const [body, setBody] = useState('');
//! ... создадим одно, в котором будет объект со множеством ключ/значений 
// состояние которое добавляет пост из полей <MyInput />
const [post, getPost] = useState({ title: '', body: ''});
 

  // обработчик события (добавить пост):
  const addNewPost = (e) => { 
    e.preventDefault() // сброс действия браузера по умолчанию
    //! newPost уже не нужен, ...
    // const newPost = {
    //   id: Date.now(),
    //   title: post.title,
    //   body: post.body,
    // };
    // добавляем к уже существующим данным (...posts) - новые (newPost)
    //! вместо него просто ДОБАВИМ ОБЪЕКТ к старым (...post,) новые Date.now()   - остальные новые данные в MyInput (onChange)
    setPosts([...posts, {...post, id: Date.now()}]);
    // обнуляем (устанавливаем пустые строки) текущие значения в объекте post: title и body, 
    // чтобы поля input были пустыми
    getPost({ title: '', body: ''});
  }

  return (
    <div className="App">
      <form>
        {/* УПРАВЛЯЕМЫЕ КОМПОНЕНТЫ */}
        <MyInput
          value={post.title}
          //! это называется деструктуризация объекта: https://learn.javascript.ru/destructuring-assignment#ostatok-obekta
          //! -------------getPost({...старые данные, новые}) 
          onChange={(e) => getPost({...post, title: e.target.value})}
          type="text" 
          placeholder="Заголовок поста"
        />
        <MyInput
          value={post.body}
          onChange={(e) => getPost({...post, body: e.target.value})}
          type="text" 
          placeholder="Описание поста"
        />
        {/* событие на кнопке */}
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title="Посты про javaScript"/>
    </div>
  );
}

export default App;