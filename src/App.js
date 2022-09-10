// 'react' импортируем в каждый файл, где создается компонент
// использую хук useState
import React, {useState} from 'react';

function App() {
//[имя переменной, имя метода (любое), которое изменяет значение переменной] = useState(значение по-умолчанию)
  const [likes, setLikes] = useState(0);
// МОЖНО ИСПОЛЬЗОВАТЬ НЕСКОЛЬКО ХУКОВ ПОДРЯД
  const [value, setValue] = useState('ТЕКСТ В ИНПУТЕ'); 


  function increment() {
    setLikes(likes + 1);
  }

  function decrement() {
    setLikes(likes - 1);
  }

  return (
    <div className="App">
      <h1>{likes}</h1>
      <h1>{value}</h1>

      <input 
        type="text" 
        value={value} 
     // onChange={event => event.target.value} // такое пишется в нативном JS
        onChange={event => setValue(event.target.value)} // а так пишется изменяющее состояние в react
      />
      
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default App;
