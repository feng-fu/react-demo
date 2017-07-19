import * as React from 'react'
import { Link } from 'react-router'

export default class Index extends React.Component {
  render() {
    return (
      <div className="index">
        this is index page...
        <Link to="/about">home</Link>
      </div>
    )
  }
}