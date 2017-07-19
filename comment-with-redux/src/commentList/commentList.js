import React, { Component } from 'react'

import Comment from './comment'

export default class CommentList extends Component {
  onDeleteComment(index) {
    const { comments } = this.props
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index+1)
    ]
    localStorage.setItem('comments', JSON.stringify(newComments))
    if(this.props.deleteComment) {
      this.props.deleteComment(index)
    }
  }
  _loadLocalComments() {
    let comments = localStorage.getItem('comments')
    comments = comments ? JSON.parse(comments) : []
    if(this.props.initComments) {
      this.props.initComments(comments)
    }
  }
  componentWillMount() {
    this._loadLocalComments()
  }
  render() {
    console.log(this.props.comments)
    return (
      <ul>
        {this.props.comments.map((comment, i) => {
          return (
            <Comment
              comment={comment}
              key={i}
              index={i}
              onDeleteComment={this.onDeleteComment.bind(this)}
            />)
        })}
      </ul>
    )
  }
}