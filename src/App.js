import React from 'react';
import {useState, useMemo} from 'react';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyModal from './components/UI/myModal/MyModal';
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
//! состояние модального окна == false
const [modal, setModal] = useState(false);


const createPost = (newPost) => {
  setPosts([...posts, newPost]);
  // ! Скрыть модальное окно, после созднания поста
  setModal(false);
};

const removePost = (post) => {
  setPosts(posts.filter((item) => item.id !== post.id))
}


// отсортированный массив постов
const sortedPosts = useMemo(() => {
  console.log('ОТРАБОТАЛА ФУНКЦИЯ getSortedPosts')  
  if(filter.sort) {  
    return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
  } 
  return posts
}, [filter.sort, posts])

// ПОИСК 
const sortedAndSearchedPosts = useMemo(() => {
  // Методы toLowerCase() и toUpperCase() меняют регистр символов:
  return sortedPosts.filter((post) => post.title.toLowerCase().includes(filter.query))
}, [filter.query, sortedPosts]) // <= зависимости: значение в посковой строке, отсортерованный список постов


  return (
    <div className="App">
      {/*//! Кнопка чтобы показать модальное окно */}
      <MyButton style={{marginTop: "20px"}} onClick={()=>setModal(true)}>
          Создать новый пост
      </MyButton>
      {/* //! Модальное окно */}
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      {/* style={} - это локальные стили */}
      <hr style={{margin: '15px 0'}}/> 
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList posts={sortedAndSearchedPosts} title="Посты про javaScript" remove={removePost}/>
    </div>
  );
}

export default App;