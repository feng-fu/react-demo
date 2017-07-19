import * as React from 'react'
import { Link } from 'react-router'

export default class Main extends React.Component {
  render() {
    return (
      <div className="main">
        this is main page...
        <Link to="/about">about</Link>
      </div>
    )
  }
}