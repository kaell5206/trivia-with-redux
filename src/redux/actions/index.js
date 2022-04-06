export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_PROFILE = 'SAVE_PROFILE';
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const SUM_SCORE = 'SUM_SCORE';

// Actions para requisição de Token
export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const saveToken = (token) => ({
  type: SAVE_TOKEN,
  payload: token,
});

const fetchNewToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data.token;
};

export const fetchToken = () => async (dispatch) => {
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

export const saveQuestions = (data) => ({
  type: SAVE_QUESTIONS,
  payload: data,

});

const fetchWithToken = async (token) => {
  const questionResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await questionResponse.json();
  return data;
};

export const fetchQuestions = (token) => async (dispatch) => {
  try {
    const invalidToken = 3;
    let data = await fetchWithToken(token);
    if (data.response_code === invalidToken) {
      const newToken = fetchNewToken();
      dispatch(saveToken(newToken));
      data = await fetchWithToken(newToken);
    }
    return dispatch(saveQuestions(data));
  } catch (error) {
    console.log(error);
  }
};

// Action de soma do placar:

export const saveScore = (score) => ({
  type: SUM_SCORE,
  payload: score,
}
);
