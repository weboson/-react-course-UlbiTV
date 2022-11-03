import React from 'react';
import {useState, useMemo} from 'react';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyModal from './components/UI/myModal/MyModal';
//! КАСТОМНЫЙ ХУК
import { usePosts } from './hooks/usePosts';
import './styles/App.css';

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

//! КАСТОМНЫЙ ХУК (usePosts.jsx):
const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
// это как обычный модуль, в котором функции, которые связаны цепью вызовов (друг друга вызывают)
// методом декомпозиции импортируем нужную функцию: {usePosts}
// и передаем этой функции, пропсы: usePosts(posts, filter.sort, filter.query);
// а внутри модуля функция принимая все нужные пропсы, вызывает другого: useSortedPosts(posts, sort)



const createPost = (newPost) => {
  setPosts([...posts, newPost]);
  // Скрыть модальное окно, после создания поста
  setModal(false);
};

const removePost = (post) => {
  setPosts(posts.filter((item) => item.id !== post.id))
}

// логика сортировки и фильтрации (поиск)
//! метод сортировки постов "sortedPosts" - перенесен в useSortedPosts (хук usePosts.jsx)
//! метод фильтрации (поиск) "sortedAndSearchedPosts" - перенесен в sortedAndSearchedPosts (хук usePosts.jsx)
// sortedAndSearchedPosts запускает sortedPosts, и потом отсортированный массив уже фильтрует (поиск)

  return (
    <div className="App">
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