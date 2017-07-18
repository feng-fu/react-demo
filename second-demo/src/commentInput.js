import { initComments,addComment,deleteComment } from './store/comment'
import React, { Component } from 'react'

class CommentInput extends Component {
  static propTypes = {
    onSubmit:PropTypes.func,
    comments: PropTypes.array
  }
  constructor(props) {
    super(props)
    this.state = {
      username: props.username,
      comment: '',
      createdTime: ''
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
      const {username, comment, createdTime} = this.state
      this.props.onSubmit({username, comment, createdTime: +new Date()})
    }
    this.setState({comment:''})
  }
  // componentWillMount() {
  //   this.setState({
  //     username: localStorage.getItem('username') || ''
  //   })
  // }
  componentDidMount() {
    this.commentBox.focus()
  }
  handleUsernameBlur(event) {
    if(this.props.onUserNameInputBlur) {
      this.props.onUserNameInputBlur(event.target.value)
    }
  }
  _saveUsername(username) {
    localStorage.setItem('username', username)
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
              onBlur={this.handleUsernameBlur.bind(this)}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">Content:</span>
          <div className="comment-field-input">
            <textarea 
              value={this.state.comment}
              onChange={this.handleCommitChange.bind(this)}
              ref={(commentBox)=>(this.commentBox = commentBox)}
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

const mapDispatchToProps = (dispatch) => {
  return {
    initComments: (comments) => {
      dispatch(initComments(comments))
    },
    onDeleteComment: (commentIndex) => {
      dispatch(deleteComment(commentIndex))
    }
  }
}