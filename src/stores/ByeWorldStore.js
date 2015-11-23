import _ from 'lodash';
import { CLICKED_BUTTON } from 'actions/HelloWorldActions';
import HelloWorldStore from './HelloWorldStore';

class ByeWorldStore {

  storeDependencies = [HelloWorldStore];

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
