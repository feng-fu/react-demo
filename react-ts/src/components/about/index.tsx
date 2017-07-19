import * as React from 'react'
import { Link } from 'react-router'

export default class About extends React.Component {
  render() {
    return (
      <div className="about">
        this is about page...
        <Link to="/">home</Link>

      </div>
    )
  }
}