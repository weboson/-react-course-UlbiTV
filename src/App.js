import React from 'react';
import './styles/App.css';
//! РОУТИНГ (многостраничное приложение) 
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Navbar from './components/UI/navBar/Navbar';
import AppRouter from './components/AppRouter';

//! Контекст: https://ru.reactjs.org/docs/context.html
import { AuthContext } from './context';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  //console.log(AuthContext); 
  //console.log(AuthContext.Provider); 
  //! состояние аутентификации (login) 
  const [isAuth, setIsAuth] = useState(false)

  //! сохраним значение контекста (false/true) в localStorage, чтобы при обнолении страницы данные не сбрасывались до по-умолчанию (false)
  useEffect(() => {
    //! localStorage - хранилище объектов данных ('key', 'value')
    // auth в аргументе это просто имя объекта данных, который мы установили в Login.jsx (localStorage.setItem())
    if (localStorage.getItem('auth')) { // получить по ключу 'auth'
      setIsAuth(true);
    } //else { // так как false у нас по-умолчанию, значит else не нужен
      //setIsAuth()
    //}
  }) 


  return (
    //! оборачиваем в контекст наше приложение (указаных маршрутах), с помощью Provider и его пропа value={}
    <AuthContext.Provider value={{
      isAuth, // сокращенный вид записи {isAuth: isAuth,...
      setIsAuth // сокращенный вид записи ...setIsAuth: setIsAuth(),}
      }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>

  )
}

export default App;