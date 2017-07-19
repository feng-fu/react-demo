import React, { Component } from 'react'
import CommentInput from './commentInput'

export default class CommentInputContainer extends Component {
  constructor() {
    super()
    this.state = {
      username: ''
    }
  }
  componentWillMount() {
    const username = localStorage.getItem('username')
    if(!username) return
    this.setState({
      username
    })
  }
  onUserNameInputBlur(username) {
    localStorage.setItem('username', username)
  }
  onSubmit(comment) {
    const { comments } = this.props
    const newComments = [...comments, comment]
    localStorage.setItem('comments', JSON.stringify(newComments))
    if(this.props.onSubmit) {
      this.props.onSubmit(comment)
    }
  }
  render() {
    return (
      <CommentInput 
        username={this.state.username}
        onUserNameInputBlur={this.onUserNameInputBlur.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
      />
    )
  }
}