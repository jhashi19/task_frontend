import {
  START_FETCH,
  FETCH_SUCCESS,
  ERROR_CATCHED,
  INPUT_LOGIN,
  INPUT_SIGNUP,
  TOGGLE_MODE
} from '../actions/actionTypes';

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case START_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ERROR_CATCHED:
      return {
        ...state,
        error: 'User Name or Password is not correct.',
        isLoading: false,
      };
    case INPUT_LOGIN:
      return {
        ...state,
        credentialsLogin: {
          ...state.credentialsLogin,
          [action.field]: action.payload,
        },
        error: '',
      };
    case INPUT_SIGNUP:
      return {
        ...state,
        credentialsSignup: {
          ...state.credentialsSignup,
          [action.field]: action.payload,
        },
        error: '',
      };
    case TOGGLE_MODE:
      return {
        ...state,
        isLoginView: !state.isLoginView,
      };
    default:
      return state;
  };
};

export default loginReducer;

