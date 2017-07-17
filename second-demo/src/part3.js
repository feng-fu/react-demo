/**
 * 第三阶段
 * 高阶组件
 * 高阶组件是一个函数，而非一个组件
 */
import React, { Component } from 'react'

const NewComponent = higherOrderComponent(OldComponent)

const test1 = (WrappedComponent) => {
  class NewComponent extends Component {
    render() {
      return <WrappedComponent />
    }
  }
  return NewComponent
}

/**
 * 以上即是一个最简单的高阶组件
 * 通过传入一个WrappedComponent 然后渲染出来
 * 以上组件什么都没有做，只是渲染了一次
 */

const test2 = (WrappedComponent, name) => {
  class NewComponent extends Component {
    constructor() {
      super()
      this.state = {data: null}
    }

    compoinentWillMount() {
      let data = localStorage.getItem(name)
      this.setState({ data })
    }
    
    render() {
      return <WrappedComponent data={this.state.data} />
    }

  }
  return NewComponent
}


/**
 * 有了以上的高阶组件
 */

class InputWithUserName extends Copmponent {
  render () {
    return <input type="text" value={this.props.data}/>
  }
}

InputWithUserName - test2(InputWithUserName, 'username')




/**
 * 现在，InputWithUserName 就是一个被高阶组件加工过的组件
 */

class UserNamePart extends Component {
  render() {
    return (
      <div>
        用户名：<InputWithUserName />
      </div>
    )
  }
}