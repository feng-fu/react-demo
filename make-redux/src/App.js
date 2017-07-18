const appState = {
  title: {
    text: 'React 小书',
    color: 'red'
  },
  content: {
    text: 'React 小书内容',
    color: 'blue'
  }
}

function renderApp (appState) {
  renderTitle(appState.title)
  renderContent(appState.content)
}

function renderTitle (title) {
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = title.text
  titleDOM.style.color = title.color
}
function renderContent(content) {
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = content.text
  contentDOM.style.color = content.color
}

renderApp(appState)

/**
 * appState是一个全局变量
 * 他可能，也可以被任何操作修改
 * 
 * 矛盾：
 * 1. 模块之间需要共享数据
 * 2. 数据可能被任意修改导致不可预料的结果
 */


// function  dispatch (action) {
//   switch (action.type) {
//     case 'UPDATE_TITLE_TEXT':
//       appState.title.text = action.text
//       break
//     case 'UPDATE_TITLE_COLOR':
//       appState.title.color = action.color
//       break
//     default:
//       break
//   }
// }

/**
 * step 1 优雅的修改共用数据
 * 定义如上一个dispatch 所有对数据的操作必须经过它
 * 他接受一个action(object) 
 * 其中包含一个type 只有个type被是被，操作才能执行对appState的修改
 */

// dispatch({type: 'UPDATE_TITLE_TEXT', text: '《React 小书》'})
// dispatch({type: 'UPDATE_TITLE_COLOR', color: 'blue'})

// 这样，所有关于数据的修改都会经过dispatch 如果有问题，直接在dispatch中打断点即可


// renderApp(appState)


/**
 * step 2：
 * 抽离store和监控数据变化
 * 
 */

// function createStore(state, stateChanger) {
//   const getState = () => state
//   const dispatch = (action) => stateChanger(state, action)
//   return { getState, dispatch }
// }

/**
 * 以上createStore接受两个参数
 * state: 表示应用程序状态
 * stateChanger: function 类似以上dispatch
 */


function stateChanger(state, action) {
  switch (action.type) {
    case "UPDATE_TITLE_TEXT":
      state.title.text = action.text
      break
    case "UPDATE_TITLE_COLOR":
      state.title.color = action.color
      break
    default:
      break
  }
}

const store = createStore(appState, stateChanger)

// renderApp(store.getState())


/**
 * 监控数据变化
 */

function createStore(state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = stateChanger(state, action) // 覆盖原对象
    listeners.forEach(listener => listener())
  }
  return { getState, dispatch, subscribe }
}

// store.subscribe(() => renderApp(store.getState()))
// // 每次改变数据，会触发renderApp 从新渲染页面
// store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》'})
// store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'yellow'})


/**
 * step 3: 什么是纯函数(Pure Function)
 * 一个函数的返回结果只依赖于他的参数，
 * 在执行过程中没有副作用（执行过程中产生了外部可观察的变化），称为纯函数
 */


/**
 * 共享结构的对象提高性能
 * 修改renderApp
 */

function renderApp(newAppState, oldAppState = {}) {
  if(newAppState === oldAppState) return
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

function renderTitle (newTitle, oldTitle) {
  if(newTitle === oldTitle) return
  // render ...
  console.log('title')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}
function renderContent (newContent, oldContent) {
  if(newContent === oldContent) return
    // render ...
  console.log('content')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

let oldState = store.getState()
store.subscribe(() => {
  const newState = store.getState()
  renderApp(newState, oldState)
  oldState = newState
})

store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》'})
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'yellow'})

// 由于对象的特性，上面的代码并不能达到想要的效果
// 修改stateChanger

function stateChanger(state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state
  }
}


/**
 * reducer
 */
// 合并appState 和 stateChanger


function stateChanger(state, action) {
  if(!state) {
    return {
      title:
      {
        text: 'React.js 小书',
        color: 'red'
      },
      content: {
        text: 'React.js 小书content',
        color: 'blue'
      }
    }
  }
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state
  }
}

// 修改后的createStore

function createStore (reducer) {
  let listeners = [], state = null
  const subscribe = (listener) => this.listeners.push(listener)
  const getState = (state) => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }
  dispatch() // 初始化
  return { getState, dispatch, subscribe }
}

// 给stateChanger去一个名字 reducer 修改上述代码参数

/**
 * reducer 是一个纯函数，他接受两个参数，一个state，一个action
 */

// function reducer1(state, action) {
//   // 初始化state， switch case
// }

// const store1 = createStore(reducer1)

// renducerApp(store.getState()) // 首次渲染
// store.dispatch(...) 