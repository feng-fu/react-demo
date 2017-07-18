import { initComments,addComment,deleteComment } from './store/comment'
import React, { Component } from 'react'

class CommentList extends Component {
  static propTypes = {
    comment: PropTypes.array,
    initComments: PropTypes.func,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number
  }
  // constructor() {
  //   super()
  //   this._getProcessedContent.bind(this)
  // }
   _updateTimeString () {
    const comment = this.props.comment
    const duration = (+Date.now() - comment.createdTime) / 1000
    this.setState({
      timeString: duration > 60
        ? `${Math.round(duration / 60)} 分钟前`
        : `${Math.round(Math.max(duration, 1))} 秒前`
    })
  }
  componentWillMount () {
    this._updateTimeString()
    this._timer = setInterval(
      this._updateTimeString.bind(this),
      5000
    )
  }
  handleDeleteComment(content) {
    if(this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index)
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null
  }
  _getProcessedContent (content) {
    return content
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  }
  render() {
    const { comment } = this.props
    return (
      <li className="comment">
        <span className="comment-user">{comment.username}: </span>
        <p dangerouslySetInnerHTML={{
          __html: this._getProcessedContent(comment.comment)
        }} />
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
        <span className='comment-delete' onClick={this.handleDeleteComment.bind(this)}>
          删除
        </span>
      </li>
    )
  }
}