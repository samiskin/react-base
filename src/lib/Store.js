import _ from 'lodash';
import Dispatcher from 'Dispatcher';
import {compose, createStore, applyMiddleware} from 'redux';
import HelloWorldStore from 'stores/HelloWorldStore';
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

getStoreMap() {
  return {
    helloWorld: HelloWorldStore
  }
}



// This function takes the map of state properties to stores and
// creates a Redux reducer from it.  This returns a function because
// in order to allow both a reducer and accessors in a single store
// class, we end up having a circular dependency.  this file needs
// to reference the reducers in the store classes, but the store
// classes need to reference this file for their accessors.
function getStoresReducer() {
  return (state, action) => {
    let newState = {};
    let storeMap = getStoreMap();

    _.forEach(storeMap, (store, key) => {
      let value = store ? // Store _might_ not exist due to circular dependency
        store.reduce.bind(store)(state[key], action) : null;

      newState[key] = value || state[key]; // Default to old value
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
