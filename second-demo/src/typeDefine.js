import React, { Component } from 'react'
import PropTypes from 'prop-type'

/**
 * 类型验证
 * 如下：
 * 在头部引入PropTypes，并且给Comment添加类属性propTypes里面规定了传入的comment必须是一个object
 * 此时，如果传入数字或其他内容，就会出错
 */

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object
  }
  render() {
    const { comment } = this.props
    return (
      <div className="comment">
        <div className="comment-user">
          <span>{comment.username}</span>
        </div>
        <p>{comment.content}</p>
      </div>
    )
  }
}