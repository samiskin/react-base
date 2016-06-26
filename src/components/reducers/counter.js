const INCREMENT_COUNTER = Symbol('INCREMENT_COUNTER');
const DECREMENT_COUNTER = Symbol('DECREMENT_COUNTER');

const increment = () => ({ type: INCREMENT_COUNTER });
const decrement = () => ({ type: DECREMENT_COUNTER });


export default function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}

export {
    increment,
    decrement,
};
