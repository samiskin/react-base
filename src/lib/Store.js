import _ from 'lodash';
import Dispatcher from 'Dispatcher';
import {compose, createStore, applyMiddleware} from 'redux';
import HelloWorldStore from 'stores/HelloWorldStore';
import {devTools} from 'redux-devtools';


function getStoresReducer() {
  let StoreMap = {
    helloWorld: HelloWorldStore
  }

  return (state, action) => {
    let newState = {};

    _.forEach(StoreMap, (store, key) => {
      let value = store ?
        store.reduce.bind(store)(state[key], action) : null;

      newState[key] = value || state[key];
    });

    return newState;
  }
}

class Store {
   constructor() {
     this.store = compose(
       devTools()
     )(createStore)(this.reducer);
   }

   getState() {
     return this.store.getState();
   }

  subscribe(listener) {
    return this.store.subscribe(listener);
  }

  dispatch(action) {
    this.store.dispatch(action);
  }

  reducer(state = {}, action) {
    return getStoresReducer()(state, action);
  }
}

export default new Store();
