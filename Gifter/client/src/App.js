import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PostProvider } from './providers/PostProvider';
import PostList from './components/PostList';

function App() {
  return (
    <div className="App">
      <PostProvider>
        <PostList />
      </PostProvider>
    </div>
  );
}

export default App;
