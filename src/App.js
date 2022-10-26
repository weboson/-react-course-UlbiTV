import React from 'react';
import {useState} from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyInput from './components/UI/input/MyInput';
import MySelect from './components/UI/select/MySelect';
import './styles/App.css';


//! мое решение функции Search, но проблемой, которую озвучил автор “1:13:06”: https://youtu.be/GNrdg3PzpJQ?t=4386 
// Проблема: чтобы вернуть список постов в исходного сосотояние, придется ОБНОВИТЬ  старницу

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
const [selectedSort, setSelectedSort] = useState('');
//!3 состояние для поиска (Myinput) (текущее значение )
const [searchQuery, setSearchQuery] = useState('')

// обработчик (тема "подъем состояния")
const createPost = (newPost) => {
  // изменяем состояние в App.js передовая через пропсы:
  setPosts([...posts, newPost]);
};

// удаление поста (кнопкой)
const removePost = (post) => {
  setPosts(posts.filter((item) => item.id !== post.id))
}

// сортировка массива постов (MySelect)
const sortPosts = (sort) => {
  setSelectedSort(sort) // текущий выбор (По названию/По описанию)
  // console.log(sort)
  //отсортируем массив постов - воспользуемся состоянием setPosts
  //так как на прямую мутировать состояние нельзя, сделаем копию массива  [...arr] - используя деструктуризацию
  //чтобы отсортеровать строки используем JS-встроенный метод: https://learn.javascript.ru/array-methods#sort-fn
  setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort]) )) 
}

//! Поиск (MyInput)
const searchPost = (search) => {
  //console.log(search);
  setSearchQuery(search)
  // фильтруем массив постов по поиску подСТРОКИ в каждом элементе
  setPosts(posts.filter((item) => item.title.includes(search))); 
}

  return (
    <div className="App">
      <PostForm create={createPost}/>
      {/* style={} - это локальные стили */}
      <hr style={{margin: '15px 0'}}/> 
      <div>
        {/*//! ПОИСК */}
        {/*  переиспользуя компонент MyInput */}
        <MyInput 
          value={searchQuery}
          placeholder="Поиск..."
          onChange={(event) => {searchPost(event.target.value)}}
        />
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