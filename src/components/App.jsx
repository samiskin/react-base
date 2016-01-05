
import React from 'react';
import { Provider } from 'react-redux';
import Store from 'Store';

export default class App extends React.Component{
  render() {
    return (
      <Provider store={Store}>
        <div> Hello World </div>
      </Provider>
    );
  }
}
