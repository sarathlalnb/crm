// Action types
export const SET_TOKEN = 'SET_TOKEN';
export const CLEAR_TOKEN = 'CLEAR_TOKEN';

// Action creators
export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const clearToken = () => ({
  type: CLEAR_TOKEN,
});
