import React from 'react';
// import { useState, useMemo } from 'react';
// import PostFilter from './components/PostFilter';
// import PostForm from './components/PostForm';
// import PostList from './components/PostList';
// import MyButton from './components/UI/button/MyButton';
// import MyModal from './components/UI/myModal/MyModal';

// import { usePosts } from './hooks/usePosts'; // КАСТОМНЫЙ ХУК
import './styles/App.css';
// // хук useEffect
// import { useEffect } from 'react';
// // наш API - метод запроса списка постов с сервера
// import PostService from './API/PostService'
// // компонент индикатора (кружочек)
// import Loader from './components/UI/Loader/Loader';
// // кастомный хук логики (try...catch {callback}) запросов на сервер:
// import { useFetching } from './hooks/useFetching';
// // расчет страниц (аналитика) и массива парядковых чисел для кнопок
// import { getPageCount, getPagesArray } from './utils/pages';
// // компонент пагинации
// import Pagination from './components/Pagination/Pagination';
//! РОУТИНГ (многостраничное приложение) 
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import Navbar from './components/UI/navBar/Navbar';
import AppRouter from './components/AppRouter';



function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App;