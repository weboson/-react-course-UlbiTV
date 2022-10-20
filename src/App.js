import React from 'react';
import {useState} from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MySelect from './components/UI/select/MySelect';
import './styles/App.css';

//! SELECT
// ! Сложноватый момент (select). Таймкод “1:08:48”: https://youtu.be/GNrdg3PzpJQ?t=4128
function App() {
//состояние в котором, объект с ключами / значениями, котороые ПО-УМОЛЧАНИЮ (чтобы отобразить пример списка постов)
  const [posts, setPosts] = useState([
    // значение(я) массива posts по-умолчанию
    {id: 1, title: 'A-JavaScript 1', body: 'B-Description'},
    {id: 2, title: 'B-JavaScript 2', body: 'C-Description'},
    {id: 3, title: 'D-JavaScript 3', body: 'A-Description'},
    {id: 4, title: 'C-JavaScript 3', body: 'D-Description'},
  ])

//! состояние для сортировки (select)
const [selectedSort, setSelectedSort] = useState('');


// обработчик (тема "подъем состояния")
const createPost = (newPost) => {
  // изменяем состояние в App.js передовая через пропсы:
  setPosts([...posts, newPost]);
};

// удаление поста (кнопкой)
const removePost = (post) => {
  setPosts(posts.filter((item) => item.id !== post.id))
}

//! сортировака массива постов (MySelect)
const sortPosts = (sort) => {
  setSelectedSort(sort) // текущий выбор (По названию/По описанию)
  // console.log(sort)
  //отсортируем массив постов - воспользуемся состоянием setPosts
  //так как на прямую мутировать состояние нельзя, сделаем копию массива  [...arr] - используя деструктуризацию
  //чтобы отсортеровать строки используем JS-встроенный метод: https://learn.javascript.ru/array-methods#sort-fn
  setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort]) )) 
}
  return (
    <div className="App">
      <PostForm create={createPost}/>
      {/* style={} - это локальные стили */}
      <hr style={{margin: '15px 0'}}/> 
      <div>
        {/*//! MySelect.jsx */}
        <MySelect 
          value= {selectedSort}
          onChange={sortPosts} 
          defaultValue="Cортировка: "
          options={[
            {value: "title", name: "По названию"}, 
            {value: "body", name: "По описанию"}
          ]}
        />
      </div>
      { posts.length
        ? 
        <PostList posts={posts} title="Посты про javaScript" remove={removePost}/>
        : 
        <h1 style={{ textAlign: 'center' }}>
          Постов не найдено
        </h1>
      }
    </div>
  );
}

export default App;