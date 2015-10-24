
import React from 'react';
import Store from 'Store';
import shallowEqual from 'utils/shallowEqual';


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
