import React from 'react';
//! 1. импортировал useRef
import { useState, useRef } from 'react';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

import './styles/App.css';

// по клику по кнопке, в консоле появляется текущее значение (title) из поля input 
function App() {
  //! состояние (useState) №1 хранить все посты, и метод setPosts, 
  // который добавляет в массив "posts" данные, введенные  с полей "MyInput" 
  const [posts, setPosts] = useState([
    // значение(я) массива posts по-умолчанию
    {id: 1, title: 'JavaScript 1', body: 'Description'},
    {id: 2, title: 'JavaScript 2', body: 'Description'},
    {id: 3, title: 'JavaScript 3', body: 'Description'},
  ])
  
  //! состояние №2 для первого MyInput (заголовок)  
  const [title, setTitle] = useState('');
  //! состояние №3 для второго MyInput (описание)  
  const [body, setBody] = useState('');

 

  // обработчик события (добавить пост):
  const addNewPost = (e) => { 
    e.preventDefault() // сброс действия браузера по умолчанию
    //!  создаем объект с новыми данными
    const newPost = {
      id: Date.now(),
      title,
      body
    };
    //! добавляем к уже существующим данным - новые 
    setPosts([...posts, newPost]);
  }

  return (
    <div className="App">
      <form>
        {/* УПРАВЛЯЕМЫЕ КОМПОНЕНТЫ */}
        <MyInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text" 
          placeholder="Заголовок поста"
        />
        <MyInput
          value={body}
          onChange={(e) => setBody(e.target.value)}
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