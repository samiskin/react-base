
import Store from 'Store';

class TextStore {

  getText() {
    return Store.getState().text;
  }

  reduce(state = 'Wat', action) {
    switch(action.type) {
      case 'CHANGE':
        return action.data;
      default:
        return state;
    }
  }

}

export default new TextStore();
