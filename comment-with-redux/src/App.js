import React, { Component } from 'react';
import './App.css';
import CommentInput from './commentInput/';
import CommentList from './commentList/';

class App extends Component {
  render() {
    return (
      <div className="wrapped">
        <CommentInput />
        <CommentList />
      </div>
    );
  }
}

export default App;
