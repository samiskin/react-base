
import React from 'react';
import Store from 'Store';

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
      <div>
        <div> Hello World </div>
        {DevTools}
      </div>
    );
  }
}
