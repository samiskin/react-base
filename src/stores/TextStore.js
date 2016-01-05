
import Store from 'Store';

class TextStore {

  getText() {
    return Store.getState().text;
  }

  reduce(state = 'Wat', action) {
    return state;
  }

}

export default new TextStore();
