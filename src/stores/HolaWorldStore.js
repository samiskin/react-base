import _ from 'lodash';
import { CLICKED_BUTTON } from 'actions/HelloWorldActions';
import Store from 'Store';
import HelloWorldStore from './HelloWorldStore';
import ByeWorldStore from './ByeWorldStore';

class HolaWorld {

  storeDependencies = [HelloWorldStore, ByeWorldStore];

  reduce(state = {thriceHello: 0}, action) {
    switch (action.type) {
      case CLICKED_BUTTON:
        return _.assign({}, state, {thriceHello: HelloWorldStore.getTimesClicked() * 3});
      default:
        return state;
    }
  }

}

export default new HolaWorld();
