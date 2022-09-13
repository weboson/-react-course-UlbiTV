import React from 'react';
import { useState } from 'react';
import PostList from './components/PostList';
// ! списки
// import styles
import './styles/App.css';

function App() {
  // состояние хранит в себе массив posts для списка №1
  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScript 1', body: 'Description'},
    {id: 2, title: 'JavaScript 2', body: 'Description'},
    {id: 3, title: 'JavaScript 3', body: 'Description'},
  ])

  // состояние хранит в себе массив posts2 для списка №2
  const [posts2, setPosts2] = useState([
    {id: 1, title: 'Python 1', body: 'Description'},
    {id: 2, title: 'Python 2', body: 'Description'},
    {id: 3, title: 'Python 3', body: 'Description'},
  ])


  return (
    <div className="App">
      <PostList posts={posts} title="Посты про javaScript"/>
      <PostList posts={posts2} title="Посты про Python"/>
    </div>
  );
}

export default App;
