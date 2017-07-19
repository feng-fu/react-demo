import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Router, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';

import Index from './index'
import Home from 'COMPONENTS/home/index'
import Main from 'COMPONENTS/main/index'
import About from 'COMPONENTS/about/index'


const routerDefault = (
  <Router history={hashHistory}>
      <Route path="/" component={Home} />
      {/*<IndexRoute component={Home} />*/}
      <Route path="main" component={(props) => <Main required="some string" {...props} />} />
      <Route path="about" component={About} />
  </Router>
)

export default routerDefault