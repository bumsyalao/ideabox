import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actionType from '../../actions/types';
import localStorageMock from '../../__mocks__/localStorageMock';
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  viewUser,
  editProfile,
  forgotPasswordAction,
  resetPasswordAction
} from '../../actions/userAction';

window.localStorage = localStorageMock;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const token = 'token';

describe('User Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Register User', () => {
    it('should make an AJAX call to register user', (done) => {
      moxios.stubRequest('/api/v1/user/register', {
        status: 201,
        response: {
          message: 'Your account has been created',
          userDetails: {
            id: '5a37b6bc21dfde711f9ad885',
            username: 'udokho',
            email: 'udo@email.com'
          }
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.REGISTER_USER,
        message: 'Your account has been created',
        userInfo: {
          id: '5a37b6bc21dfde711f9ad885',
          username: 'udokho',
          email: 'udo@email.com'
        }
      }];
      store.dispatch(registerRequest({
        username: 'udokho',
        email: 'udo@email.com',
        password: 'udokho'
      })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });

  describe('Login User', () => {
    it('should make AJAX call to login user', (done) => {
      moxios.stubRequest('/api/v1/user/login', {
        status: 200,
        response: {
          token,
          userDetails: {
            username: 'udokho',
            email: 'udo@email.com',
            id: '5a37b6bc21dfde711f9ad885'
          },
          message: 'You have logged in succesfully'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.LOGIN_USER,
        message: 'You have logged in succesfully',
        userInfo: {
          username: 'udokho',
          email: 'udo@email.com',
          id: '5a37b6bc21dfde711f9ad885'
        }
      }];
      store.dispatch(loginRequest({
        username: 'udokho',
        password: 'udokho'
      })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });

  describe('Logout User', () => {
    it('should call function to logout user', (done) => {
      moxios.stubRequest('/api/v1/user/logout', {
        status: 200,
        response: {
          message: null
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.LOGOUT_USER
      }];
      store.dispatch(logoutRequest());
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });

  describe('View User', () => {
    it('Should make AJAX call to get a user\'s profile', (done) => {
      moxios.stubRequest('/api/v1/user/profile', {
        status: 200,
        response: {
          foundUser: {
            id: '5a37b6bc21dfde711f9ad885',
            username: 'udokho',
            email: 'udo@email.com'
          }
        }
      });
      const store = mockStore({});
      const expectedAction = [];
      store.dispatch(viewUser());
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });

  describe('Edit Profile', () => {
    it('Should make AJAX call to edit user profile', (done) => {
      moxios.stubRequest('/api/v1/user/update', {
        status: 200,
        response: {
          foundUser: {
            id: '5a37b6bc21dfde711f9ad885',
            username: 'udokhos',
            email: 'udo@email.com'
          },
          message: 'Your profile has been updated succesfully'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.EDIT_USER_PROFILE,
        foundUser: {
          id: '5a37b6bc21dfde711f9ad885',
          username: 'udokhos',
          email: 'udo@email.com'
        },
        message: 'Your profile has been updated succesfully'
      }];
      store.dispatch(editProfile({
        username: 'udokhos',
        email: 'udo@email.com'
      })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });
});
