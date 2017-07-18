import React, { Component } from 'react'


/**
 * propsChildren 应用
 * props.children 是一个数组
 */

class CardDetail extends Component {
  render() {
    return (
    <div className="card">
      <div className="card-content">
        {this.props.children}
      </div>
    </div>
  )
  }
}

class Card extends Component {
  render() {
    return (
      <CardDetail>
        <h2>React 小书</h2>
        <p>开源，免费，专业，简单</p>
        <span>订阅：</span>
        <input type="text"/>
      </CardDetail>
    )
  }
}


export default Card