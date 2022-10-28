import React from 'react';
//! импортируем useMemo 
import {useState, useMemo} from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyInput from './components/UI/input/MyInput';
import MySelect from './components/UI/select/MySelect';
import './styles/App.css';

//! Search от автора
//! Решение проблемы в Search от автора “1:13:06”: https://youtu.be/GNrdg3PzpJQ?t=4386 
// Проблема: чтобы вернуть список постов в исходного сосотояние, придется ОБНОВИТЬ  старницу
// Решение: перестановка структуры кода.
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
//3 состояние для поиска (Myinput) (текущее значение )
const [searchQuery, setSearchQuery] = useState('');


// обработчик (тема "подъем состояния")
const createPost = (newPost) => {
  // изменяем состояние в App.js передовая через пропсы:
  setPosts([...posts, newPost]);
};

// удаление поста (кнопкой)
const removePost = (post) => {
  setPosts(posts.filter((item) => item.id !== post.id))
}

//! установка текущего значения сортировки select (MySelect)
const sortPosts = (sort) => {
  setSelectedSort(sort) // назначить текущий выбор (По названию/По описанию)
}

//! ОТСОРТИРОВАТЬ сам массив постов
function getSortedPosts() {
  if(selectedSort) {   
    console.log('ОТРАБОТАЛА ФУНКЦИЯ getSortedPosts')  
    return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
  }
  return posts
}

//! сохранить массив в константу и передать в компонент PostList для рендера 
// ОТСОРТИРОВАННЫЙ список постов (будет передан в PostList)
//так как на прямую мутировать состояние нельзя, сделаем копию массива  [...arr] - используя деструктуризацию
//чтобы отсортеровать строки используем JS-встроенный метод: https://learn.javascript.ru/array-methods#sort-fn
const sortedPosts = getSortedPosts();


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
          // onChange={(event) => {searchPost(event.target.value)}}
          onChange={(event) => {setSearchQuery(event.target.value)}}
          placeholder="Поиск..."
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
        <PostList posts={sortedPosts} title="Посты про javaScript" remove={removePost}/>
        : 
        <h1 style={{ textAlign: 'center' }}>
          Постов не найдено
        </h1>
      }
    </div>
  );
}

export default App;