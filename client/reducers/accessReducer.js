import * as types from '../actions/types';

export default (
  state = { user: {}, message: null, isAuthenticated: false },
  action
) => {
  switch (action.type) {
    case types.LOGIN_USER:
    case types.REGISTER_USER:
    case types.LOGGEDIN_USER:
      return {
        ...state,
        user: action.userInfo,
        message: action.message,
        isAuthenticated: true
      };
    case types.GET_USER:
      return {
        ...state,
        user: action.foundUser
      };
    case types.EDIT_USER_PROFILE:
      return {
        ...state,
        user: action.foundUser
      };
    case types.LOGOUT_USER:
      return {
        ...state,
        user: {},
        message: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};
