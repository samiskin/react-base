import createLogger from 'redux-logger';
import shallowEqual from 'utils/shallowEqual';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { createElement } from 'react';
import { fluxEnhancer } from 'redux-flux-store';

let logger = createLogger({
  level: 'info',
  duration: true
});

let store = compose(
  fluxEnhancer({

  }),
  applyMiddleware(thunk, logger),
  (() => __DEV__ ? require('DevTools.jsx').default.instrument() : (p) => p)()
)(createStore)();

global['__redux_store__'] = store;

export default store;

export { connect } from 'react-redux';

