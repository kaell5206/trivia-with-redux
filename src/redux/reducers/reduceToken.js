import { SAVE_TOKEN } from '../actions';

const INITIAL_STATE = '';

const reduceToken = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_TOKEN:
    return action.payload;

  default:
    return state;
  }
};

export default reduceToken;
