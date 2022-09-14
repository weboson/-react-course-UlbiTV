import React from 'react';
import { useState } from 'react';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

import './styles/App.css';

//! по клику по кнопке, в консоле появляется текущее значение (title) из поля input 
function App() {
  // состояние №1 хранит в себе массив posts для списка
  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScript 1', body: 'Description'},
    {id: 2, title: 'JavaScript 2', body: 'Description'},
    {id: 3, title: 'JavaScript 3', body: 'Description'},
  ])
  
  //! состояние №2 хранит в себе значение по-умолчанию (''), которое в поле input 
  const [title, setTitle] = useState('проверка');

  //! обработчик события (добавить пост):
  const addNewPost = (e) => { // можно как стрелочную, так и декларативную  функцию (function F() {}) - не важно  
    e.preventDefault()
    console.log(title)
  }

  return (
    <div className="App">
      <form>
        {/* УПРАВЛЯЕМЫЙ КОМПОНЕНТ (Controlled Components)*/}
        <MyInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text" 
          placeholder="Заголовок поста"
        />
        <MyInput type="text" placeholder="Описание поста"/>
        {/* событие на кнопке */}
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title="Посты про javaScript"/>
    </div>
  );
}

export default App;
