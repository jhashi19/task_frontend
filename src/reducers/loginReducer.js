import {
  START_FETCH,
  FETCH_SUCCESS,
  ERROR_CATCHED,
  INPUT_EDIT_LOGIN,
  INPUT_EDIT_REGISTER,
  TOGGLE_MODE
} from '../actions/actionTypes';

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case START_FETCH:
      return {
        ...state,
        isLoading: true,
      };
  };
};

export default loginReducer;

