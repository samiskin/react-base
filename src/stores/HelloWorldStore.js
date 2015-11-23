import _ from 'lodash';
import { CLICKED_BUTTON } from 'actions/HelloWorldActions';
import Store from 'Store';

class HelloWorldStore {

  getState() {
    return Store.getState().helloWorld;
  }

  getTimesClicked() {
    return this.getState().timesClicked;
  }

  reduce(state = {timesClicked: 0}, action) {
    switch (action.type) {
    case CLICKED_BUTTON:
      return _.assign({}, state, {timesClicked: state.timesClicked + 1});
    default:
      return state;
    }
  }

}

export default new HelloWorldStore();
