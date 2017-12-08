import axios from 'axios';
import attachAuthToken from '../utils/attachAuthToken';
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from './types';

export const loginSuccess = (userInfo, message) => ({
  type: LOGIN_USER,
  message,
  userInfo
});

export const registerSuccess = (userInfo, message) => ({
  type: REGISTER_USER,
  message,
  userInfo
});

export const logoutSuccess = () => ({
  type: LOGOUT_USER
});

/**
 * api call to loginRequest
 * @param {object} loginInfo
 * @return {object} returns userDetails message
 */
export const loginRequest = loginInfo => dispatch =>
  axios
    .post('/api/v1/user/login', loginInfo)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      attachAuthToken(response.data.token);
      return dispatch(
        loginSuccess(response.data.userDetails, response.data.message)
      );
    })
    .catch((error) => {
      throw error;
    });
/**
 * api call to registerRequest
 * @param {object} registerInfo
 * @return {object} returns userDetails message
 */
export const registerRequest = registerInfo => dispatch =>
  axios
    .post('/api/v1/user/register', registerInfo)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      attachAuthToken(response.data.token);
      return dispatch(
        registerSuccess(response.data.userDetails, response.data.message)
      );
    })
    .catch((error) => {
      throw error;
    });
/**
 * api call to logout
 * @param {object} null
 * @return {boolean} returns if the call is successful
 */
export const logoutRequest = () => (dispatch) => {
  localStorage.removeItem('token');
  attachAuthToken(false);
  return dispatch(logoutSuccess());
};
