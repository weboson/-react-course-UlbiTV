import React from 'react';
import { useState, useMemo } from 'react';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyModal from './components/UI/myModal/MyModal';

import { usePosts } from './hooks/usePosts'; // КАСТОМНЫЙ ХУК
import './styles/App.css';
// хук useEffect
import { useEffect } from 'react';
// наш API - метод запроса списка постов с сервера
import PostService from './API/PostService'
// компонент индикатора (кружочек)
import Loader from './components/UI/Loader/Loader';
//! кастомный хук логики запросов на сервер:
import { useFetching } from './hooks/useFetching';



function App() {
  const [posts, setPosts] = useState([
    // { id: 1, title: 'testSearch A-JavaScript 1', body: 'B-Description' },
    // { id: 2, title: 'B-JavaScript 2', body: 'C-Description' },
    // { id: 3, title: 'D-JavaScript 3', body: 'A-Description' },
    // { id: 4, title: 'C-JavaScript 3', body: 'D-Description' },
  ])

  const [filter, setFilter] = useState({ sort: '', query: '' })

  //* состояние: модальное окно:
  // открывается при нажатие на кнопку "Создать новый пост" (modal==true)
  // при нажатии на кнопку в модальном окне "Создать пост" - модальное окно закрывается (madal==false)
  // при клике на темный фон (CSS-класс .myModal) - модальное окно закрывается (modal==false)
  // состояние модального окна == false
  const [modal, setModal] = useState(false);


  //! перенес логику в useFetching.jsx
  //! можно удалять:
  // const [isPostsLoading, setIsPostsLoading] = useState(false); // по-умолчанию false (не показывать)

  //* КАСТОМНЫЙ ХУК (usePosts.jsx) - генерирует список, а <PostList /> их рендерить:
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  // это как обычный модуль (файл), в котором одна или несколько (чаще) хуков (функции), которые могут быть связаны цепью вызовов (друг друга вызывают)
  // методом декомпозиции импортируем нужный хук[ки](функцию): {usePosts}
  // и передаем этой функции (хуку), пропсы: usePosts(posts, filter.sort, filter.query);
  // в нашем случае, внутри модуля функция принимая все нужные пропсы, вызывает другого с частью пропсами: useSortedPosts(posts, sort)
  // используется: <PostList posts={sortedAndSearchedPosts} title="Посты про javaScript" remove={removePost}/>
  
  
  
  //* СЕРВЕР (запросы/храненние данных) 
  // (тайкод видео 1:36:25, страница 95 в документе)
  // Для работы с сервером "JSONPlaceholder"(fake API for testing ) 
  // с помощью библиотеки AXIOS (заменитель стандартного метода fetch())
  //! кастомных хук запросов на сервер + колбэк с нашим запросом и установкой постов
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => { 
    //! вставленный фрагмент из старого метода fetchPosts
    //  --сам axios-запрос на сервер перенесли в API--
    const posts = await PostService.getAll() // обязательно await, а то posts не становиться массивом и все методы массивов выдают ошибку
    // в состояние setPosts() -  устананвливается полученный массив постов
    setPosts(posts) // структура данных схожа, возвращае данные это массив объектов, типа: [{id, title, body}, ...]
    //!--------------------- 
  })


  // создать пост через кнопку "создать новый пост"
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    // Скрыть модальное окно, после создания поста
    setModal(false);
  };



  //* useEffect---------
  // запрос на сервер происходит при первом рендере (единожды - т.к. массив пустой)
  // хук useEffect - с колбеком запросов на сервер JSONPlaceholder, используя вместо fetch - библиотеку axios (в PostServise.js)
  // так как useEffect ничего не возращает (в отличии от useMemo), то обходимся без переменной
  useEffect(
    // колбэк вызывает наш метод запроса
    () => { fetchPosts(); } //! метод запроса
    ,
    []
  )

  //* удаление поста по кнопке "Удалить"
  const removePost = (post) => {
    setPosts(posts.filter((item) => item.id !== post.id))
  }

  //* логика сортировки (select) и фильтрации (поиск)
  // метод сортировки постов "sortedPosts" - перенесен в хук useSortedPosts (файл usePosts.jsx)
  // метод фильтрации (поиск) "sortedAndSearchedPosts" - перенесен в хук sortedAndSearchedPosts (файл usePosts.jsx)
  // sortedAndSearchedPosts запускает sortedPosts, и потом отсортированный массив уже фильтрует (поиск)

  return (
    <div className="App">

      {/*// Кнопка чтобы показать модальное окно */}
      <MyButton style={{ marginTop: "20px" }} onClick={() => setModal(true)}>
        Создать новый пост
      </MyButton>
      {/* // Модальное окно */}
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      {/* style={} - это локальные стили */}
      <hr style={{ margin: '15px 0' }} />
      {/* select, search */}
      <PostFilter filter={filter} setFilter={setFilter} />


      
      {/*//! обработчик ошибки: если в PostService.js подпортить url запроса, то спровоцируется ошибка */}
      {/*// «&&» находит первое ложное значение.*/} 
      {/*То есть, если postError (true), то пойдет дальше и покажет сообщение */}
      {/*// подробнее: https://learn.javascript.ru/logical-operators#i-nahodit-pervoe-lozhnoeznachenie */}
      {
        postError && 
        <h1>Произошла ошибка ${postError}</h1>
      }
      {/* // индикатор загрузки (загрузки с сервера) */}
      {/* // УСЛОВИЕ индикации - если isPostsLoading == true, то индикатор появляется, если false - размонтируетсяы */}
      {
        isPostsLoading
          ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>  // компонент индикатора (кружочек)
          : <PostList posts={sortedAndSearchedPosts} title="Посты про javaScript" remove={removePost} />
      }

    </div>
  );
}

export default App;