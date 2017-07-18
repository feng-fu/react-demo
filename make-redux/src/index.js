import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Header, Content } from './component'
import './index.css'

const themeReducer = (state, action) => {
  if(!state) return {themeColor: 'red'}
  switch (action.type) {
    case 'CHANGE_COLOR':
      return {...state, themeColor: action.themeColor}
    default:
      return state
  }
}
const store = createStore(themeReducer)

class App extends Component {
  render() {
    return (
      <div>
          <Header />
          <Content />
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));