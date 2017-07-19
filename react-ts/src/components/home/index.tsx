import * as React from 'react'
import { Link } from 'react-router'

export default class Home extends React.Component {
  render() {
    return (
      <div className="home">
        this is home page...
        <Link to="/main">main</Link>

      </div>
    )
  }
}