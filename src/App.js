import React from 'react';
import {useState} from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import './styles/App.css';

function App() {
//состояние в котором, объект с ключами / значениями, котороые ПО-УМОЛЧАНИЮ (чтобы отобразить пример списка постов)
  const [posts, setPosts] = useState([
    // значение(я) массива posts по-умолчанию
    {id: 1, title: 'JavaScript 1', body: 'Description'},
    {id: 2, title: 'JavaScript 2', body: 'Description'},
    {id: 3, title: 'JavaScript 3', body: 'Description'},
  ])

// обработчик (для подъема состояния)
const createPost = (newPost) => {
  // изменяем состояние в App.js передовая через пропсы:
  setPosts([...posts, newPost]);
};

// удаление поста (кнопкой)
const removePost = (post) => {
  setPosts(posts.filter((item) => item.id !== post.id))
}

  return (
    <div className="App">
      <PostForm create={createPost}/>
      {/*//! - РЕШЕНИЕ автора (Ulbi TV): отрисовка по условию (Conditional Rendering) */}
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