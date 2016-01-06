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

export default store;


export function connect(mapStateToProps) {

  return (WrappedComponent) => {
    class Connect extends React.Component {

      constructor(props) {
        super(props);
        this.store = store;
        this.state = mapStateToProps(store.getState());
        this.unsubscribe = store.subscribe(() => {
          this.setState(mapStateToProps(this.store.getState()));
        });
      }

      computeMergedProps() {
        return {
          ...this.props,
          ...this.state
        };
      }

      render() {
        return createElement(WrappedComponent, this.computeMergedProps());
      }
    }

    Connect.displayName = `Connect(${WrappedComponent.displayName})`;

    return Connect;
  }

}
