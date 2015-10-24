import Dispatcher from 'Dispatcher';

export const CLICKED_BUTTON = Symbol();

class HelloWorldActions {
  clickButton() {
    Dispatcher.dispatch({type: CLICKED_BUTTON});
  }
}

export default new HelloWorldActions();
