import { combineReducers } from 'redux';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const formReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SUBMIT_FORM':
      return { ...state, ...payload };
    default:
      return state;
  }
};

const rootReducer = {
  form: formReducer
};

export default combineReducers(rootReducer);
