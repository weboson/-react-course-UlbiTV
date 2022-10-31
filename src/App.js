import React from 'react';
import {useState, useMemo} from 'react';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import './styles/App.css';

//! Search (от автора)
function App() {
//состояние в котором, объект с ключами / значениями, котороые ПО-УМОЛЧАНИЮ (чтобы отобразить пример списка постов)
  const [posts, setPosts] = useState([
    // значение(я) массива posts по-умолчанию
    {id: 1, title: 'testSearch A-JavaScript 1', body: 'B-Description'},
    {id: 2, title: 'B-JavaScript 2', body: 'C-Description'},
    {id: 3, title: 'D-JavaScript 3', body: 'A-Description'},
    {id: 4, title: 'C-JavaScript 3', body: 'D-Description'},
  ])

//2 состояние для сортировки (MySelect) (запоминать для ренедера текущего выбора)
// const [selectedSort, setSelectedSort] = useState('');
//3 состояние для поиска (Myinput) (текущее значение )
// const [searchQuery, setSearchQuery] = useState('');
//! декомпозировали: объеденив состояние сортировки (PostFilter=>mySelect) и поиска (PostFilter=>myInput) в один объект
const [filter, setFilter] = useState({sort: '', query: ''})


// обработчик (тема "подъем состояния")
const createPost = (newPost) => {
  // изменяем состояние в App.js передовая через пропсы:
  setPosts([...posts, newPost]);
};

// удаление поста (кнопкой)
const removePost = (post) => {
  setPosts(posts.filter((item) => item.id !== post.id))
}

// установка текущего значения сортировки для select (MySelect)
// const sortPosts = (sort) => {
//   setFilter(sort) // назначить текущий выбор (По названию/По описанию)
// }

// useMemo для выдачи отсортированного массива постов
// аргументы: функция сортировки и зависимости [отсортированный массив, посты]
const sortedPosts = useMemo(() => {
  // изначально поле MySelect не выбрано/не активно, а пустую строку сортировать методом arr.sort нельзя - будет ошибка, поэтому условие:
  // если в поле что-то введено, то сортируем посты
  console.log('ОТРАБОТАЛА ФУНКЦИЯ getSortedPosts')  
  if(filter.sort) {  // selectedSort - текущий выбор (value/name == По названию/По описанию)
    // сортировка массива постов (с последующим отображением в PostList (ниже)) 
    return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
  } 
  // если нет, то рендерим список, в исходном состоянии, как есть:
  return posts
}, [filter.sort, posts]) // <= зависимости

// ПОИСК (выводит массив, как отсортированный, так и как результат поиска)
// также запишем в useMemo - чтобы не запускалась функция поиска, каждый раз, при любом рендере
const sortedAndSearchedPosts = useMemo(() => {
  // Методы toLowerCase() и toUpperCase() меняют регистр символов:
  return sortedPosts.filter((post) => post.title.toLowerCase().includes(filter.query))
}, [filter.query, sortedPosts]) // <= зависимости: значение в посковой строке, отсортерованный список постов


  return (
    <div className="App">
      <PostForm create={createPost}/>
      {/* style={} - это локальные стили */}
      <hr style={{margin: '15px 0'}}/> 
      {/*//! декомпозировали в компонент PostFilter.jsx */}
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList posts={sortedAndSearchedPosts} title="Посты про javaScript" remove={removePost}/>
    </div>
  );
}

export default App;