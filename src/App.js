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

//! удаление поста (кнопкой) - самостоятельный код:
const removePost = (id) => {
  //! отфильтровать массив posts
  //! уже имеющее состояние нельзя изменять напрямую, нужно сначала сделать копию
  const copy = [...posts]
  const result = copy.filter((item, index, array) => {
    // если true - элемент добавляется к результату, и перебор продолжается
    // возвращается пустой массив в случае, если ничего не найдено
    //! вернуть все элменты массива posts, которые НЕ равны переданному аргументу id (из PostItem.jsx)
    //! который мы передали из PostItem.jsx при нажатии на кнопку "удалить"
    return item.id !== id;
  });
  //! и только так изменять состояние
  setPosts(result);
  console.log(result)
}

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <PostList posts={posts} title="Посты про javaScript" remove={removePost}/>
    </div>
  );
}

export default App;