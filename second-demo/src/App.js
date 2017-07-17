import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      comment_list: []
    }
  }
  handleSubmit(comment) {
    this.state.comment_list.push(comment)
    this.setState({
      comment_list: this.state.comment_list
    })
  }
  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmit.bind(this)} />
        <ul>
          {this.state.comment_list.map((single_comment) => {
            return (
              <CommentList key={single_comment.username} comment={single_comment} />
            )
          })}
        </ul>
      </div>
    );
  }
}


class CommentInput extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      comment: ''
    }
  }
  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    })
  }
  handleCommitChange(event) {
    this.setState({
      comment: event.target.value
    })
  }
  handleSubmit() {
    if(this.props.onSubmit) {
      const {username, comment} = this.state
      this.props.onSubmit({username, comment})
    }
    this.setState({comment:''})
  }
  render() {
    const { username,comment } = this.props
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">UserName:</span>
          <div className="comment-field-input">
            <input 
              value={this.state.username}
              onChange={this.handleUsernameChange.bind(this)}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">Content:</span>
          <div className="comment-field-input">
            <textarea 
              value={this.state.comment}
              onChange={this.handleCommitChange.bind(this)}
            />
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
      </div>
    )
  }
}

class CommentList extends Component {
  render() {
    const { comment } = this.props
    return (
      <li className="comment">
        <span className="comment-user">{comment.username}: </span>
        <p> {comment.comment}</p>
      </li>
    )
  }
}

export default App;
