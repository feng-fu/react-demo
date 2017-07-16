import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/**
 * 组件的ref
 * 
 */
class AutoFocusInput extends React.Component {
  componentDidMount() {
    this.input.focus()
  }
  render() {
    return (
      <div>
        <input type="text" ref={(input) => this.input = input}/>
        <Card content={
          <div>
            <h2>React 🌲 小书</h2>
            <div>开源，免费，简单</div>
            订阅： <input type="text"/>
          </div>
        } />
        <Card2>
          <h2>React 小书</h2>
          <div>开源，免费，简单</div>
          订阅: <input type="text"/>
        </Card2>
      </div>
    )
  }
}

/**
 * props.children    和 容器类组建
 * 
 */

class Card extends React.Component {
  render() {
    const { content } = this.props
    return (
      <div className="card">
        <div className="card-content">
          {content}
        </div>
      </div>
    )
  }
}

// 将以上方式改写成children形式
class Card2 extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div className="card">
        <div className="card-content">
          {children}
        </div>
      </div>
    )
  }
}


ReactDOM.render(<AutoFocusInput />, document.getElementById('root'));
registerServiceWorker();


/**
 * 生命周期
 * 
 * componentWillMount()
 * componentDiddsMount()
 * componentWillUnmount()
 * 
 * 触发顺序
 * 挂载阶段生命周期
 * 组件挂载到组件销毁的过程
 * constructor  -> componentWillMount() -> render() -> componentWillUnmount 
 * 
 * 组件更新生命周期
 * 更新阶段生命周期
 * shouldComponentUpdate(nextProps, nextState)
 * 此方法必须返回一个boolean值，可通过返回false来阻止本次渲染
 * 此生命周期一般会用来在React.js 性能优化上非常有用
 * componentWillReceiveProps(nextProps)
 * 组件从父组件接受到新的props之前调用
 * componentWillUpdate()
 * 组件重新渲染前调用
 * componentDidUpdate()
 * 组件重新渲染并且把更改变更到真实DOM后调用
 * 
 */



