export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_PROFILE = 'SAVE_PROFILE';
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';

// Actions para requisição de Token
export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const saveToken = (token) => ({
  type: SAVE_TOKEN,
  payload: token,
});

export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    dispatch(saveToken(data.token));
  } catch (error) {
    console.log(error);
  }
};

// Action para salvar dados no Header

export const saveProfile = (name, email) => ({
  type: SAVE_PROFILE,
  payload: {
    name,
    gravatarEmail: email,
  },
});

// Action para Buscar as perguntas na API ou novo Token e depois as Perguntas

/* export const fetchQuestions = (token) => ({
  type: FETCH_QUESTIONS,
  payload: token,
}); */

export const saveQuestions = (data) => ({
  type: SAVE_QUESTIONS,
  payload: data,

});

export const fetchQuestions = (token) => async (dispatch) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    return dispatch(saveQuestions(data));
  } catch (error) {
    console.log(error);
  }
};
