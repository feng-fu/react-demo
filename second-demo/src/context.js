/**
 * 场景： 切换主题
 * 方式1： 通过设置最顶层组件的props，一层层往下设置
 * 问题： 需要将这个东西一层层往下传，无法维护
 * 方式2：让主题成为一个可全局共享的状态，在每个组件内去按需取
 * 而不用手动传
 * 
 * ---> context
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Index extends Component {
  static childContextTypes = {
    themeColor: PropTypes.string
  }
  constructor() {
    super()
    this.state = { themeColor: 'red'}
  }
  getChildContext() {
    return { themeColor: this.state.themeColor }
  }
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    )
  }
}


class Header extends Component {
  render() {
    return (
      <div>
        <h2>This is header...</h2>
        <Title />
      </div>
    )
  }
}

class Main extends Component {
  render() {
    return (
      <div>
        <h2>This is Main...</h2>
        <Content />
      </div>
    )
  }
}

class Title extends Component {
  static contextTypes = {
    themeColor: PropTypes.string
  }
  render() {
    return (
      <h1 style={{ color: this.context.themeColor }}>React 小书</h1>
    )
  }
}

class Content extends Component {
  render() {
    return (
      <div>
        <h2>React 小书 Content...</h2>
      </div>
    )
  }
}



ReactDOM.render(
  <Index />,
  document.getElementById('root')
)

// registerServiceWorker();


/**
 * 祖先组件里
 * 使用getChildContext
 * 后代组件里，使用this.context获取
 * 问题：
 *    context打破了组件之间props传递数据的规范
 *    增强了组件之家您的耦合性
 *    但是，他想一个全局变量一般，context里面
 *    的数据能够被随意接触，就能被随意修改
 *    所以折让程序的运行变得不可预料
 * 
 *    ---->>>>> Redux
 * 
 */