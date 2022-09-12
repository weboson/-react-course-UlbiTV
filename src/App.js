import React from 'react';
import PostItem from './components/PostItem';
// import Counter from './components/Counter';
// import ClassCounter from './components/ClassCounter'

// import styles
import './styles/App.css';

function App() {

  return (
    <div className="App">
      <PostItem post={{id: 1, title: 'JavaScript', body: 'Description'}} /> 
      <PostItem post={{id: 2, title: 'JavaScript', body: 'Description'}} /> 
      <PostItem post={{id: 3, title: 'JavaScript', body: 'Description'}} /> 
      <PostItem post={{id: 4, title: 'JavaScript', body: 'Description'}} /> 
    </div>
  );
}

export default App;
