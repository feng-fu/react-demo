import { connect } from 'react-redux'
import Container from './container'
import { addComment } from '../store/action'
const mapStateToProps = (state) => {
  return {
    comments: state.commentReducer.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (comment) => {
      dispatch(addComment(comment))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)