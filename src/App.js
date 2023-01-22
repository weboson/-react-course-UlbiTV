import React from 'react';
import {useState, useMemo} from 'react';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyModal from './components/UI/myModal/MyModal';

import { usePosts } from './hooks/usePosts'; // КАСТОМНЫЙ ХУК
import './styles/App.css';
//! пакет AXIOS (заменитель fetch, т.к. короче писать код) для работы с запросами на сервер
import axios from 'axios'; // так будет ошибка (дикомпозицией {}): ... {axios} from ...

// модальное окно:
// открывается при нажатие на кнопку "Создать новый пост" (modal==true)
// при нажатии на кнопку в модальном окне "Создать пост" - модальное окно закрывается (madal==false)
// при клике на темный фон (CSS-класс .myModal) - модальное окно закрывается (modal==false)

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'testSearch A-JavaScript 1', body: 'B-Description'},
    {id: 2, title: 'B-JavaScript 2', body: 'C-Description'},
    {id: 3, title: 'D-JavaScript 3', body: 'A-Description'},
    {id: 4, title: 'C-JavaScript 3', body: 'D-Description'},
  ])

const [filter, setFilter] = useState({sort: '', query: ''})
// состояние модального окна == false
const [modal, setModal] = useState(false);

// КАСТОМНЫЙ ХУК (usePosts.jsx) - генерирует список, а <PostList /> их рендерить:
const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
// это как обычный модуль (файл), в котором одна или несколько (чаще) хуков (функции), которые могут быть связаны цепью вызовов (друг друга вызывают)
// методом декомпозиции импортируем нужный хук[ки](функцию): {usePosts}
// и передаем этой функции (хуку), пропсы: usePosts(posts, filter.sort, filter.query);
// в нашем случае, внутри модуля функция принимая все нужные пропсы, вызывает другого с частью пропсами: useSortedPosts(posts, sort)
// используется: <PostList posts={sortedAndSearchedPosts} title="Посты про javaScript" remove={removePost}/>

const createPost = (newPost) => {
  setPosts([...posts, newPost]);
  // Скрыть модальное окно, после создания поста
  setModal(false);
};

//! СЕРВЕР (запросы/храненние данных) 
// (тайкод видео 1:36:25, страница 95 в документе)
//! Для работы с сервером "JSONPlaceholder"(fake API for testing ) 
//! с помощью библиотеки AXIOS (заменитель стандартного метода fetch())
async function fetchPosts() {
  // выше импортировали Axios
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts'); // url взяли из "JSONPlaceholder": https://jsonplaceholder.typicode.com/guide/
  // console.log(response.data)
  setPosts(response.data) // структура данных схожа, возвращае данные это массив объектов, типа: [{id, title, body}, ...]
}

const removePost = (post) => {
  setPosts(posts.filter((item) => item.id !== post.id))
}

// логика сортировки (select) и фильтрации (поиск)
// метод сортировки постов "sortedPosts" - перенесен в хук useSortedPosts (файл usePosts.jsx)
// метод фильтрации (поиск) "sortedAndSearchedPosts" - перенесен в хук sortedAndSearchedPosts (файл usePosts.jsx)
// sortedAndSearchedPosts запускает sortedPosts, и потом отсортированный массив уже фильтрует (поиск)

  return (
    <div className="App">
      {/*//! Кнопка чтобы запросить->рендерить полученный список данных с сервера*/}
      {/*//! список рендерится один раз, повторного нет, так как React одни и те же данные не обновляет, сохраняя оптиминизвацию */}
      {/*//! пример: если удалить какою-нибудь статью, то кнопка обновит div список - васстоновив удаленную статью */}
      <button onClick={fetchPosts}>GET POSTS</button>

      {/*// Кнопка чтобы показать модальное окно */}
      <MyButton style={{marginTop: "20px"}} onClick={()=>setModal(true)}>
          Создать новый пост
      </MyButton>
      {/* // Модальное окно */}
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      {/* style={} - это локальные стили */}
      <hr style={{margin: '15px 0'}}/> 
      {/* select, search */}
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList posts={sortedAndSearchedPosts} title="Посты про javaScript" remove={removePost}/>
    </div>
  );
}

export default App;