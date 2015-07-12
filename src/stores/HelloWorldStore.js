
import Store from 'Store';
import { Actions } from 'actions/HelloWorldActions';

var timesClicked = 0;
class HelloWorldStore extends Store {

  getTimesClicked() {
    return timesClicked;
  }

  update(payload) {
    switch (payload.type) {
      case Actions.CLICKED_BUTTON:
        timesClicked++;
        this.emitChange();
        break;
    }
  }

}

export default new HelloWorldStore();
