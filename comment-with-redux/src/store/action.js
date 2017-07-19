import * as types from './action-type'

export const initComments = (comments) => {
  return { type: types.INIT_COMMENT, comments }
}
export const addComment = (comment) => {
  return { type: types.ADD_COMMENT, comment }
}

export const deleteComment = (commentIndex) => {
  return { type: types.DELETE_COMMENT, commentIndex }
}