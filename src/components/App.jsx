
import React from 'react';
import Store from 'store';
import Main from 'main';
import css from './styles/app.css';

export default class App extends React.Component {

  getChildContext() {
    return { store: Store };
  }

  render() {
    let DevTools = null;
    if (__DEV__) {
      let DevToolsComponent = require('dev-tools').default; //eslint-disable-line
      DevTools = <DevToolsComponent />;
    }

    return (
      <div className={css.app}>
        <Main />
        {DevTools}
      </div>
    );
  }
}
