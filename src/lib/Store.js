import { compose, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { fluxEnhancer } from 'redux-flux-store';
// import {devTools} from 'redux-devtools';

let logger = createLogger({
  level: 'info',
  duration: true
});

let store = compose(
  fluxEnhancer({


  }),
  applyMiddleware(thunk, logger)
)(createStore)();

export default store;
