import React from 'react';
//! импортируем useMemo 
import {useState, useMemo} from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyInput from './components/UI/input/MyInput';
import MySelect from './components/UI/select/MySelect';
import './styles/App.css';

//! Search от автора
//! UseMemo 1:15:15 : https://www.youtube.com/watch?v=GNrdg3PzpJQ&t=4517s
// Решение проблемы в Search от автора “1:13:06”: https://youtu.be/GNrdg3PzpJQ?t=4386 
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

// установка текущего значения сортировки select (MySelect)
const sortPosts = (sort) => {
  setSelectedSort(sort) // назначить текущий выбор (По названию/По описанию)
}


//! Хук useMemo - сортирует массива постов
// аргументы: функция сортировки и зависимости [отсортированный массив, посты]
const sortedPosts = useMemo(() => {
  // изначально поле MySelect не выбрано/не активно, а пустую строку сортировать методом arr.sort нельзя - будет ошибка, поэтому условие:
  // если в поле что-то введено, то сортируем посты
  console.log('ОТРАБОТАЛА ФУНКЦИЯ getSortedPosts')  
  if(selectedSort) {  // selectedSort - текущий выбор (value/name == По названию/По описанию)
    //! сортировка массива постов (с последующим отображением в PostList (ниже)) 
    return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
  }
  // если нет, то рендерим список, в исходном состоянии, как есть:
  return posts
}, [selectedSort, posts]) //! <= зависимости

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