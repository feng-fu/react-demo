import { createStore } from 'redux'
import * as types from './action_type'
const commentReducer = (state, action) => {
  if(!state) {
    state = { comments: [] }
  }
  switch (action.type) {
    case types.INIT_COMMENTS:
      return {
        comments: action.comments
      }
    case types.ADD_COMMENT:
      return {
        comments: [...state.comments, action.comment]
      }
    case types.DELETE_COMMENT:
      return {
        comments: [
          ...state.comments.slice(0, action.commentIndex),
          ...state.comments.slice(action.commentIndex + 1)
        ]
      }
    default:
      return state
  }
}


const store = createStore(commentReducer)

export const initComments = (comments) => {
  return { type: types.INIT_COMMENTS, comments }
}
export const addComment = (comment) => {
  return { type: types.ADD_COMMENT, comment }
}
export const deleteComment = (commentIndex) => {
  return { type: types.DELETE_COMMENT, commentIndex }
}

export default store