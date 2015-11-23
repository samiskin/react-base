import Dispatcher from 'Dispatcher';

export const CLICKED_BUTTON = Symbol('CLICKED_BUTTON');

class HelloWorldActions {
  clickButton() {
    Dispatcher.dispatch({type: CLICKED_BUTTON});
  }
}

export default new HelloWorldActions();
