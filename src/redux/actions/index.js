export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SAVE_TOKEN = 'SAVE_TOKEN';

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
    return dispatch(saveToken(data.token));
  } catch (error) {
    console.log(error);
  }
};
