import React from 'react';
import {useState, useMemo} from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyInput from './components/UI/input/MyInput';
import MySelect from './components/UI/select/MySelect';
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
const [selectedSort, setSelectedSort] = useState('');
//!3 состояние для поиска (Myinput) (текущее значение )
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

// установка текущего значения сортировки для select (MySelect)
const sortPosts = (sort) => {
  setSelectedSort(sort) // назначить текущий выбор (По названию/По описанию)
}

//! useMemo для выдачи отсортированного массива постов
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

//! ПОИСК (выводит массив, как отсортированный, так и, как результат поиска)
// также запишем в useMemo - чтобы не запускалась функция поиска, каждый раз, при любом рендере
const sortedAndSearchedPosts = useMemo(() => {
  // Методы toLowerCase() и toUpperCase() меняют регистр символов:
  return sortedPosts.filter((post) => post.title.toLowerCase().includes(searchQuery))
}, [searchQuery, sortedPosts]) //! <= зависимости: значение в посковой строке, отсортерованный список постов


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
      { sortedAndSearchedPosts.length
        ? 
        <PostList posts={sortedAndSearchedPosts} title="Посты про javaScript" remove={removePost}/>
        : 
        <h1 style={{ textAlign: 'center' }}>
          Постов не найдено
        </h1>
      }
    </div>
  );
}

export default App;