import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from 'App.jsx';

const reactHost = global.document.createElement('span');
global.document.body.appendChild(reactHost);

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="*" component={App}/>
    </Route>
  </Router>
), reactHost);
