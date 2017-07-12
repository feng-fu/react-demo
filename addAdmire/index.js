/*class LikeButton {
  constructor () {
    this.state = { isLiked: false }
  }
  changeLikeText () {
    const likeText = this.el.querySelector('.like-text')
    this.state.isLiked = !this.state.isLiked
    likeText.innerHTML = this.state.isLiked ? 'cancel' : 'add'
  }
  render () {
    this.el = createDOMFromString(`
      <button class="like-button">
        <span class="like-text">add</span>
        <span>👍</span>
      </button>
    `)
    this.el.addEventListener('click', this.changeLikeText.bind(this), false)
    return this.el
  }
}*/


/**
 * 改变状态，直接改变DOM ---> 当状态变多，DOM操作变得十分频繁
 * 进化1: 从直接操作dom元素  -->  用新生成的DOM替换就的dom 
 * 进化2: 使用特定的方法去管理状态，而不再是直接改变，便于管理 
 * createDOMFromString 是一个虚构的方法，类似jsx功能
 */


class LikeButton2 {
  constructor () {
    this.state = { isLiked: false }
  }
  setState (state) {
    const oldEl = this.el
    this.state = state
    this.el = this.render()
    // 每次状态改变后，重新渲染,不再需要手动操作DOM
    if(this.onStateChange) this.onStateChange(oldEl, this.el)
  }
  changeLikeText () {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }
  render () {
    this.el = createDOMFromString(`
      <button class="like-btn">
        <span>${this.state.isLiked ? 'cancel' : 'add'}</span>
        <span>👍</span>
      </button>
    `)
    return this.el
  }
}

/**
 * step 3 抽象
 * 为了让代码灵活，可以将这种模式抽离出来，放入Component类中
 */

class Component {
  constructor (props = {}) {
    this.props = props
  }
  setState(state) {
    this.oldEl = this.el
    this.state = state
    this.el = this._renderDOM()
    if(this.onStateChange) this.onStateChange(oldEl, this.el)
  }
  _renderDOM() {
    this.el = createDOMFromString(this.render())
    if(this.onClick) {
      this.el.addEventListener('click', this.onClick.bind(this), false)
      // and so on...
    }
    return this.el
  }
}

/**
 * 有了这样一个组件父类，所有的组建都可以继承这个父类来构建
 * 它定义了两个方法
 * setState 
 * 私有方法  _renderDOM
 * 
 */

// 构建一个方法，将节点插入DOM中

const mount = (component, wrapper) => {
  wrapper.appendChild(component._renderDOM())
  component.onStateChange = (oldEl, newEl) => {
    wrapper.insertBefore(newEl, oldEl)
    wrapper.removeClild(oldEl)
  }
}

// 原来的点赞组建可以继承自Component

class LikeButtonExtend extends Component {
  constructor (props) {
    this.state = { isLiked: false }
    super(props)
    // constructor 的 继承
  }
  onClick() {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }
  render() {
    return `
      <button class="like-btn">
        <span class="like-text">${this.state.isLiked ? 'cancel' : 'add'}</span>
        <span></span>
      </button>
    `
  }
}

mount(new LikeButtonExtend, wrapper)

// 使用es6默认参数形式，传入可选参数

class Test {
  constructor (props = {}) {
    this.props = props
  }
}

class TestChild extends Test {
  constructor (props) {
    super(props)
  }
  // and so on ...
}

// 类似的，我现在可以通过Component创建出更多的组建了


class RedBlueButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      color: 'red'
    }
  }
  onClick() {
    this.setState({
      color: 'blue'
    })
  }
  ernder() {
    return `
      <div style='color: ${this.state.color};'>${this.state.color}</div>
    `
  }
}