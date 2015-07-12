import Dispatcher from 'Dispatcher';

var Actions = {
  clickButton() {
    Dispatcher.dispatch(Dispatches.CLICKED_BUTTON);
  }
}

var Dispatches = keyMirror({
    CLICKED_BUTTON: null
});

export {
  Dispatches,
  Actions
};
