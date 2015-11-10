import _ from 'lodash';
import { CLICKED_BUTTON } from 'actions/HelloWorldActions';
import Store from 'Store';
import HelloWorldStore from './HelloWorldStore';
import HolaWorldStore from './HolaWorldStore';

class ByeWorldStore {

  storeDependencies = [HelloWorldStore, HolaWorldStore];

  reduce(state = {twiceHello: 0}, action) {
    switch (action.type) {
      case CLICKED_BUTTON:
        return _.assign({}, state, {twiceHello: HelloWorldStore.getTimesClicked() * 2});
      default:
        return state;
    }
  }

}

export default new ByeWorldStore();
