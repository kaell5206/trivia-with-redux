import { combineReducers } from 'redux';
import reduceToken from './reduceToken';
import reducePlayer from './reducePlayer';
import reduceQuestions from './reduceQuestions';

const rootReducer = combineReducers({
  player: reducePlayer, token: reduceToken, questions: reduceQuestions });

export default rootReducer;
