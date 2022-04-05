import { SAVE_TOKEN, REQUEST_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
  isLoading: false,
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
};

const reduceToken = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      isLoading: true,
    };

  case SAVE_TOKEN:
    return {
      ...state,
      token: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};

export default reduceToken;
