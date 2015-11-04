
import React from 'react';
import Store from 'Store';
import shallowEqual from 'utils/shallowEqual';



/*
   The Base class of every React Component

   Components should obtain all their store data using a syncState() method.
   ex:
    syncState() {
      return {
        users: UserStore.getUsers()
      };
    }

  Whenever the store changes, this base class will check to see if any
  of those variables have changed and will rerender if so.
 */

export default class Component extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.syncState() || {};
    Store.subscribe(this._update.bind(this));
  }

  _update(payload) {
    this.setState(this.syncState() || {});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }

  syncState() {
  }

}
