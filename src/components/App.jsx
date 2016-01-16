
import React from 'react';
import Button from 'Button.jsx';
import DevTools from 'DevTools.jsx';
import Store from 'Store';
import css from './styles/App.css';

export default class App extends React.Component {

  static childContextTypes = {
    store: React.PropTypes.object.isRequired
  }

  getChildContext() {
    return { store: Store };
  }

  render() {
    console.log(css);
    return (
      <div>
        <div className={css.text}> Hello World <Button /></div>
        <DevTools />
      </div>
    );
  }
}
