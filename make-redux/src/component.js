import React, { Component } from 'react'
import { connect } from 'react-redux'
class Header extends Component {
  render() {
    return (
      <div style={{color: this.props.themeColor}}>
        header
      </div>
    )
  }
}

class Content extends Component {
  render() {
    return (
      <div style={{color: this.props.themeColor}}>
        content...
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}

Header = connect(mapStateToProps)(Header)
Content = connect(mapStateToProps)(Content)

export {
  Header,
  Content
}