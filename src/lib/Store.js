import _ from 'lodash';
import Dispatcher from 'Dispatcher';
import {compose, createStore, applyMiddleware} from 'redux';
import HelloWorldStore from 'stores/HelloWorldStore';
import ByeWorldStore from 'stores/ByeWorldStore';
import {devTools} from 'redux-devtools';


/*
   This class stores the main Redux Store and provides a wrapper
   class to it.  All app state is stored here, and each immediate
   property can be bound to a Store class.  An example of this
   would be if all user data was stored in a users property.
   The getStoreMap() function would then be:

    getStoreMap() {
      return {
        users: UserStore.getUsers()
      };
    }

    Changing the order of the properties changes which property
    updates first, so for example if a ScoreStore needs access
    to the updated data in UserStore, simply have:

    return {
      users: UserStore.getUsers(),
      scores: ScoreStore.getScores()
    }
 */

let stateStoreMap = {
  byeWorld: ByeWorldStore,
  helloWorld: HelloWorldStore
};




let invertedMap = _.transform(stateStoreMap, (map, store, prop) => {
  return map.set(store, prop);
}, new Map());

let waitingSet = new Set();
let storeMap = new Map();
_.forEach(stateStoreMap, (store) => waitingSet.add(store));

let assignStore = (store) => {
  if (storeMap.has(store)) return;
  if (store === undefined || !waitingSet.has(store)) {
    throw new Error("Undefined store, check for circular dependencies in storeDependencies");
  }

  waitingSet.delete(store);
  if (Array.isArray(store.storeDependencies)) {
    store.storeDependencies.forEach((dependency) => assignStore(dependency));
  }
  storeMap.set(store, invertedMap.get(store));
};

while (waitingSet.size > 0) {
  let store = waitingSet.entries().next().value[0];
  assignStore(store);
}

let storesByProp = {};
for (let entry of storeMap) {
  storesByProp[entry[1]] = entry[0];
}

// This function takes the map of state properties to stores and
// creates a Redux reducer from it.  This returns a function because
// in order to allow both a reducer and accessors in a single store
// class, we end up having a circular dependency.  this file needs
// to reference the reducers in the store classes, but the store
// classes need to reference this file for their accessors.
let partiallyReducedState = null;
function reduceFromStores(state, action) {
  let newState = {};
  partiallyReducedState = _.assign({}, state);
  let storeMap = storesByProp;

  _.forEach(storeMap, (store, key) => {
    if (!store.reduce) throw new Error(`${store.constructor.name} must provide a reduce function`);
    let value = store.reduce.bind(store)(state[key], action);
    if (!value) throw new Error(`${store.constructor.name}.reduce must provide a default value`);
    newState[key] = value || state[key]; // Default to old value
    partiallyReducedState[key] = newState[key];
  });
  partiallyReducedState = null;

  return newState;
}

class Store {
   constructor() {
     let createStoreWithMiddleware = applyMiddleware(this.logDispatches)(createStore);
     this.store = createStoreWithMiddleware(this.reducer);
   }

   logDispatches() {
     return (next) => (dispatch) => {
       console.log(dispatch);
       return next(dispatch);
     };
   }


  getState() {
    return partiallyReducedState || this.store.getState();
  }

  subscribe(listener) {
    return this.store.subscribe(listener);
  }

  dispatch(action) {
    this.store.dispatch(action);
  }

  reducer(state = {}, action) {
    return reduceFromStores(state, action);
  }
}

export default new Store();
