import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types'

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
    this._saveComment()
  }
  handleDeleteComment(index) {
    this.state.comment_list.splice(index, 1)
    this.setState({
      comment_list: this.state.comment_list
    })
    this._saveComment()
  }
  _saveComment() {
    localStorage.setItem('comment_list', JSON.stringify(this.state.comment_list))
  }
  _getComment() {
    if(JSON.parse(localStorage.getItem('comment_list')) == null || JSON.parse(localStorage.getItem('comment_list')).length === 0) return
    this.setState({comment_list: JSON.parse(localStorage.getItem('comment_list')) || []})
  }
  componentWillMount() {
    this._getComment()
  }
  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmit.bind(this)} />
        <ul>
          {this.state.comment_list.map((single_comment, i) => {
            return (
              <CommentList
              key={single_comment.username}
              comment={single_comment}
              index={i}
              onDeleteComment={this.handleDeleteComment.bind(this)}
            />
            )
          })}
        </ul>
      </div>
    )
  }
}


class CommentInput extends Component {
  static propTypes = {
    onSubmit:PropTypes.func
  }
  constructor() {
    super()
    this.state = {
      username: '',
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
<<<<<<< HEAD
      const {username, comment} = this.state
      this.props.onSubmit({username, comment})
=======
    console.log('submit')
      const {username, comment, createdTime} = this.state
      this.props.onSubmit({username, comment, createdTime: +new Date()})
>>>>>>> 47a7e68f55a4a71526e1df1ee0d8f13726b7f6bf
    }
    this.setState({comment:''})
  }
  componentWillMount() {
    this.setState({
      username: localStorage.getItem('username') || ''
    })
  }
  componentDidMount() {
    this.commentBox.focus()
  }
  handleUsernameBlur(event) {
    this._saveUsername(event.target.value)
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

class CommentList extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
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
    console.log(content)
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

export default App;


/**
 * static 开头的类属性，如 defaultProps、propTypes。
 * 构造函数，constructor。
 * getter/setter（还不了解的同学可以暂时忽略）。
 * 组件生命周期。
 * _ 开头的私有方法。
 * 事件监听方法，handle*。
 * render*开头的方法，有时候 render() 方法里面的内容会分开到不同函数里面进行，这些函数都以 render* 开头。
 * render() 方法。
 */