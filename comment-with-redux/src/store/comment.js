import * as types from './action-type'
import { createStore } from 'redux'
const commentReducer = (state, action) => {
  if(!state) {
    state = []
  }
  switch (action.type) {
    case types.INIT_COMMENT:
      return action.comments
    case types.ADD_COMMENT:
      return [
        ...state,
        action.comment
      ]
    case types.DELETE_COMMENT:
      return [
        ...state.slice(0, action.commentIndex),
        ...state.slice(action.commentIndex + 1)
      ]
    default:
      return state
  }
}

export default createStore(commentReducer)

export const initComments = (comments) => {
  return { type: types.INIT_COMMENT, comments }
}
export const addComment = (comment) => {
  return { type: types.ADD_COMMENT, comment }
}

export const deleteComment = (commentIndex) => {
  return { type: types.DELETE_COMMENT, commentIndex }
}