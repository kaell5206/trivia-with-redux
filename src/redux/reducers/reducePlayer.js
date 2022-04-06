import { SAVE_PROFILE, SUM_SCORE } from '../actions';

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
  case SUM_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };

  default:
    return state;
  }
};

export default reducePlayer;
