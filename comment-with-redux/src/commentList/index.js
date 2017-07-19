import CommentList from './commentList'
import { initComments,deleteComment } from '../store/action'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  console.log(state)
  return {
    comments: state.commentReducer.comments
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    initComments: (comments) => {
      dispatch(initComments(comments))
    },
    deleteComment: (index) => dispatch(deleteComment(index))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList)