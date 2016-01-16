import { compose, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { fluxEnhancer } from 'redux-flux-store';
import TextStore from 'stores/TextStore';
import { createElement } from 'react';
import shallowEqual from 'utils/shallowEqual';
import DevTools from 'DevTools.jsx';
// import {devTools} from 'redux-devtools';


let logger = createLogger({
  level: 'info',
  duration: true
});

let store = compose(
  fluxEnhancer({
    text: TextStore
  }),
  applyMiddleware(thunk, logger),
  DevTools.instrument()
)(createStore)();

global['__redux_store__'] = store;

export default store;

export { connect } from 'react-redux';

