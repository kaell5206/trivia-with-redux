import { SAVE_PROFILE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const reducePlayer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PROFILE:
    return {
      ...state,
      ...action.payload,
    };

  default:
    return state;
  }
};

export default reducePlayer;
