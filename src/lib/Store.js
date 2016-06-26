import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';

const logger = createLogger({
  level: 'info',
  duration: true,
});

const store = compose(
  applyMiddleware(thunk, logger),
  (() => (__DEV__ ? require('dev-tools').default.instrument() : (p) => p))() //eslint-disable-line
)(createStore)((s = {}) => s);

global['__redux_store__'] = store;

export default store;
export { connect } from 'react-redux';
