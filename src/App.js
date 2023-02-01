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
//! наш API - метод запроса списка постов с сервера
import PostService from './API/PostService'
// компонент индикатора (кружочек)
import Loader from './components/UI/Loader/Loader';
//! кастомный хук логики (try...catch {callback}) запросов на сервер:
import { useFetching } from './hooks/useFetching';
//! расчет страниц (аналитика) и массива парядковых чисел для кнопок
import { getPageCount, getPagesArray } from './utils/pages';



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

  //! состояние общего количества страниц (header: x-total-count):
  const [totalPages, setTotalPages] = useState(0); //по-умолчанию ноль страниц, т.к. мы не знаем сразу скольок их
  //! состояние параметра лимита постов (limit) 
  const [limit, setLimit] = useState(10); // - по-умолчанию 10
  //! состояние параметра текущей страницы (page) - устанваливается в кнопках
  const [page, setPage] = useState(1); // - по-умолчанию первая страница (1) 


  //* КАСТОМНЫЙ ХУК (usePosts.jsx) - генерирует список, а <PostList /> их рендерить:
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  // это как обычный модуль (файл), в котором одна или несколько (чаще) хуков (функции), которые могут быть связаны цепью вызовов (друг друга вызывают)
  // методом декомпозиции импортируем нужный хук[ки](функцию): {usePosts}
  // и передаем этой функции (хуку), пропсы: usePosts(posts, filter.sort, filter.query);
  // в нашем случае, внутри модуля функция принимая все нужные пропсы, вызывает другого с частью пропсами: useSortedPosts(posts, sort)
  // используется: <PostList posts={sortedAndSearchedPosts} title="Посты про javaScript" remove={removePost}/>

  //! массив порядковых чисел (основываясь на общем количестве страниц "getPageCount") для кнопок:
  let pagesArray = getPagesArray(totalPages); // getPagesArray(10)


  //* СЕРВЕР (запросы/храненние данных) 
  // (тайкод видео 1:36:25, страница 95 в документе)
  // Для работы с сервером "JSONPlaceholder"(fake API for testing ) 
  // с помощью библиотеки AXIOS (заменитель стандартного метода fetch())
  // кастомных хук запросов на сервер + колбэк с нашим запросом и установкой постов
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    // вставленный фрагмент из прошлого метода fetchPosts
    //  --сам axios-запрос на сервер перенесли в API--
    //! page - получен из установленного в кнопках setPage 
    const response = await PostService.getAll(limit, page) // обязательно await, а то posts не становиться массивом и все методы массивов выдают ошибку
    // в состояние setPosts() -  устананвливается полученный массив постов
    setPosts(response.data) // структура данных схожа, возвращае данные это массив объектов, типа: [{id, title, body}, ...]

    //console.log(response.headers['x-total-count']) // скольок постов 100
    //! получим общее количество ПОСТОВ 
    const totalCount = response.headers['x-total-count']; // 100
    //! установим новое значение состояния ОБЩЕГО КОЛИЧЕСТВА СТРАНИЦ, используя метод из pages.jsx
    //console.log(`количество страниц, если выводить порциями по 10 постов: -> ${getPageCount(response.headers['x-total-count'], limit)}`)
    setTotalPages(getPageCount(totalCount, limit)); // setTotalPages(getPageCount(100, 10)) => setTotalPages(10)
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
    () => { fetchPosts(); } // метод запроса
    ,
    [page] //! зависимость, чтобы запрос происходил от изминения состояние "page" (в changePage)
  )

  //* удаление поста по кнопке "Удалить"
  const removePost = (post) => {
    setPosts(posts.filter((item) => item.id !== post.id))
  }

  //! метод для события кнопок, устанавливающий состояния: "текущая страница" [page, setPage] 
  //! и формирование соответствующего запроса"fetchPosts" 
  const changePage = (page) => {
    setPage(page); // "текущая страница" [page, setPage] (App.js)
    // получают данные со старого запроса - решение добавить зависимсоть page в useEffect()
    // fetchPosts(); // шаблон для запроса (в try...catch) из каст.хука useFetching.jsx 
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



      {/*// обработчик ошибки: если в PostService.js подпортить url запроса, то спровоцируется ошибка */}
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
      <div className='page__wrapper'>
        {
          pagesArray.map((p) =>
            <span
            //! устанавливаем в состояние текущей страницы  = в текущий номер массива (кнопки) и вызов постов
            // changePage() => { setPage(page) и fetchPosts() }
              onClick={() => {changePage(p)} } // аргумент 'p' из колбэка. То есть, так "(p)=>changePage(p)" - не работает.
              key={p}
            //! получаем page от установленного текущее setPage и сравниваем с текущим элементом из массива (кнопок)
              className={page === p ? 'page page__current' : 'page'}>
              {p}
            </span>
          )
        }
      </div>
    </div>
  );
}

export default App;