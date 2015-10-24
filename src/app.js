import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, NotFoundRoute } from 'react-router'
import App from 'App.jsx';

let reactHost = global.document.createElement('span');
global.document.body.appendChild(reactHost);

render((
  <Router>
    <Route path="/" component={App}>
      <Route path="*" component={App}/>
    </Route>
  </Router>
), reactHost);
