import { createStore } from 'redux';
import { SET_TOKEN, CLEAR_TOKEN } from './actions'; // Update with correct path to actions file

const initialState = {
  sidebarShow: true,
  theme: 'light',
  token: null,
};

const changeState = (state = initialState, action) => {
  switch (action.type) {
    case 'set':
      return { ...state, ...action };
    case SET_TOKEN:
      return { ...state, token: action.token };
    case CLEAR_TOKEN:
      return { ...state, token: null };
    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
