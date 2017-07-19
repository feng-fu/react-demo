import * as types from './action-type'

const commentReducer = (state = {comments: []}, action) => {
  switch (action.type) {
    case types.INIT_COMMENT:
      console.log({comments: action.comments})
      return {comments: action.comments}
    case types.ADD_COMMENT:
      return {
        comments: [
          ...state.comments,
          action.comment
        ]
    }
    case types.DELETE_COMMENT:
      return {comments: [
        ...state.comments.slice(0, action.commentIndex),
        ...state.comments.slice(action.commentIndex + 1)
      ]}
    default:
      return state
  }
}

export default commentReducer