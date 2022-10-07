import React from 'react';
//! 1. импортировал useRef
import { useState, useRef } from 'react';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

import './styles/App.css';

// по клику по кнопке, в консоле появляется текущее значение (title) из поля input 
function App() {
  // состояние (useState) №1 хранит в себе массив posts для списка
  // массив постов.
  const [posts, setPosts] = useState([
    // значение(я) по-умолчанию
    {id: 1, title: 'JavaScript 1', body: 'Description'},
    {id: 2, title: 'JavaScript 2', body: 'Description'},
    {id: 3, title: 'JavaScript 3', body: 'Description'},
  ])
  
  // состояние №2 хранит в себе значение по-умолчанию (''), которое в поле input 
  const [title, setTitle] = useState('');

  //! хук useRef() - которая дает ссылку на нужный элемент. Не забывать про import useRef (выше)
  //! 2. Для этого, в нужном элементе нужно добавить атрибут ref={bodyInpuRef} 
  //! 3. bodyInpuRef.carrent - харнит сам элемент, и если нужно можно взять атрибут bodyInpuRef.current.value
  const bodyInputRef = useRef();

  // обработчик события (добавить пост):
  const addNewPost = (e) => { // можно как стрелочную, так и декларативную  функцию (function F() {}) - не важно  
    e.preventDefault() // сброс действия браузера на событие (отправки (кнопка отпавить или Enter) данных в форме)? которые были по-умолчанию у браузера
    console.log(title);
    //! берем из useref - значение атрибута value элемента input
    console.log(bodyInputRef.current.value);
    //! либо сам эелмент
    console.log(bodyInputRef.current);
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
        {/* НЕ УПРАВЛЯЕМЫЙ/НЕ КОНТРОЛИРУЕМЫЙ КОМПОНЕТ (с помощью useRef) */}
        {/*! привязываем наш ref к элементу*/}
        <input ref={bodyInputRef} type="text" />
        {/* пока закомментировал собственный компонент MyInput, т.к. чтобы useRef() не знает куда вставлять данные, нужно ему подсказать куда, пока покажем useRef на стандартном <input>(выше)  */}
        {/* <MyInput type="text" placeholder="Описание поста"/> */}

        {/* событие на кнопке */}
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title="Посты про javaScript"/>
    </div>
  );
}

export default App;
//