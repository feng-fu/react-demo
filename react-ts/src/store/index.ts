import { createStore } from 'redux'

/**
 * @state变化时，会返回全新的对象，而不是通过 传参的形式、
 * 
 */

function counter(state:number = 0, action:any) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

let store = createStore(counter)

store.subscrible(() => {
  console.log(store.getState())
})

store.dispatch({type: 'INCREMENT'})

store.dispatch({type: 'INCREMENT'})