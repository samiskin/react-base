
import React from 'react';
import Store from 'Store';
import Main from 'Main.jsx';
import css from './styles/App.css';

export default class App extends React.Component {

  static childContextTypes = {
    store: React.PropTypes.object.isRequired
  };

  getChildContext() {
    return { store: Store };
  }

  render() {
    let DevTools = null;
    if (__DEV__) {
      let DevToolsComponent = require('DevTools.jsx').default;
      DevTools = <DevToolsComponent />;
    }

    return (
      <div className={css.app}>
        <Main/>
        {DevTools}
      </div>
    );
  }
}
