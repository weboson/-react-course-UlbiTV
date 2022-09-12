import React from 'react';
import PostItem from './components/PostItem';
// import Counter from './components/Counter';
// import ClassCounter from './components/ClassCounter'

//! import styles
import './styles/App.css';

function App() {

  return (
    //! className - это CSS-класс
    <div className="App">
      <PostItem /> 
      <PostItem /> 
      <PostItem /> 
      <PostItem /> 
    </div>
  );
}

export default App;
