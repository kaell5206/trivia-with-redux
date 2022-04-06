import { SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
};

const reduceQuestions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      ...action.payload,
    };
  default:
    return state;
  }
};

export default reduceQuestions;
