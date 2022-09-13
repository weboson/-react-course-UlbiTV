import React from 'react';
import { useState } from 'react';
import PostList from './components/PostList';

// import styles
import './styles/App.css';

function App() {
  // состояние хранит в себе массив posts для списка
  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScript 1', body: 'Description'},
    {id: 2, title: 'JavaScript 2', body: 'Description'},
    {id: 3, title: 'JavaScript 3', body: 'Description'},
  ])


  return (
    <div className="App">
      <form>
        <input type="text" placeholder="Заголовок поста"/>
        <input type="text" placeholder="Описание поста"/>
        <button>Создать пост</button>
      </form>
      <PostList posts={posts} title="Посты про javaScript"/>
    </div>
  );
}

export default App;
