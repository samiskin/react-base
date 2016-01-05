import { compose, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { fluxEnhancer } from 'redux-flux-store';
import TextStore from 'stores/TextStore';
import { createElement } from 'react';
// import {devTools} from 'redux-devtools';

let logger = createLogger({
  level: 'info',
  duration: true
});

let store = compose(
  fluxEnhancer({
    text: TextStore,
    hah: TextStore
  }),
  applyMiddleware(thunk, logger)
)(createStore)();

window.store = store;

export default store;



export function connect(mapStateToProps) {

  return (WrappedComponent) => {
    class Connect extends React.Component {
      render() {
        return createElement(WrappedComponent, this.props);
      }
    }

    return Connect;
  }

}













