import _ from 'lodash';
import Dispatcher from 'Dispatcher';
import {compose, createStore, applyMiddleware} from 'redux';
import HelloWorldStore from 'stores/HelloWorldStore';
import ByeWorldStore from 'stores/ByeWorldStore';
import HolaWorldStore from 'stores/HolaWorldStore';
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

 let partiallyReducedState = null;
 let cachedStoreMap = null;


function getStoreMap() {
  return {
    holaWorld: HolaWorldStore,
    helloWorld: HelloWorldStore,
    byeWorld: ByeWorldStore,
  };
}

function initializeStoreMap() {
  let origStoreMap = getStoreMap();
  let invertedMap = _.transform(origStoreMap, (map, store, prop) => {
    return map.set(store, prop);
  }, new Map());

  let allDefined = true;
  let waitingSet = new Set();
  let storeMap = new Map();
  _.forEach(origStoreMap, (store) => waitingSet.add(store));

  let assignStore = (store) => {
    console.log(store);
//    console.log(storeMap);
    if (store === undefined) {
      allDefined = false;
      return;
    }
    if (storeMap.has(store)) return;
    if (!waitingSet.has(store)) throw new Error("Circular dependency?");

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

  let storeObj = {};
  for (let entry of storeMap) {
    storeObj[entry[1]] = entry[0];
  }

  console.log(storeObj);

  if (allDefined && !cachedStoreMap) {
    cachedStoreMap = storeObj;
  }

  return storeObj;
}

// This function takes the map of state properties to stores and
// creates a Redux reducer from it.  This returns a function because
// in order to allow both a reducer and accessors in a single store
// class, we end up having a circular dependency.  this file needs
// to reference the reducers in the store classes, but the store
// classes need to reference this file for their accessors.
function reduceFromStores(state, action) {
  let newState = {};
  partiallyReducedState = _.assign({}, state);
  let storeMap = cachedStoreMap ? cachedStoreMap : initializeStoreMap();

  _.forEach(storeMap, (store, key) => {
    let value = store ? // Store _might_ not exist due to circular dependency
      store.reduce.bind(store)(state[key], action) : null;

    console.log(`Resolving store ${store.constructor.name}`);
    newState[key] = value || state[key]; // Default to old value
    partiallyReducedState[key] = newState[key];
  });
  partiallyReducedState = null;

  console.log(newState);

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
