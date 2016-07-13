
import React from 'react';
import Store from 'store';
import Main from 'main';
import { Provider } from 'react-redux';
import css from './styles/app.css';

export default class App extends React.Component {

  render() {
    let DevTools = null;
    if (__DEV__) {
      let DevToolsComponent = require('dev-tools').default; //eslint-disable-line
      DevTools = <DevToolsComponent />;
    }

    return (
      <Provider store={Store}>
        <div className={css.app}>
          <Main />
          {DevTools}
        </div>
      </Provider>
    );
  }
}
