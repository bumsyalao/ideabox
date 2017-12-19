/* global expect test */
import access from '../../reducers/accessReducer';
import { loginSuccess, registerSuccess, logoutSuccess, viewUserSuccess, editProfileSuccess } from '../../actions/userAction';
// import { userInfo, message } from '../../__mocks__/helper';

const state = {};
const userInfo = {
  id: '5a37b6bc21dfde711f9ad885',
  username: 'udokho',
  email: 'udo@email.com'
};
const message = 'You have logged in succesfully';
describe('login reducer', () => {
  it('should login a user when authentictaion is succesful', () => {
    const action = loginSuccess(userInfo, message);
    const newState = access(state, action);
    expect(newState.user.username).toEqual('udokho');
    expect(newState.message).toEqual('You have logged in succesfully');
    expect(newState.user.id).toEqual('5a37b6bc21dfde711f9ad885');
    expect(newState.isAuthenticated).toEqual(true);
  });

  it('should register a user when authentictaion is succesful', () => {
    const action = registerSuccess(userInfo);
    const newState = access(state, action);
    expect(newState.user.username).toEqual('udokho');
    expect(newState.user.id).toEqual('5a37b6bc21dfde711f9ad885');
    expect(newState.isAuthenticated).toEqual(true);
  });

  it('should logout user when the logout action is called', () => {
    const action = logoutSuccess();
    const newState = access(state, action);

    expect(newState.user).toEqual({});
    expect(newState.message).toEqual(null);
    expect(newState.isAuthenticated).toEqual(false);
  });

  it('should dispatch userInfo when view user action is called', () => {
    const action = viewUserSuccess(userInfo);
    const newState = access(state, action);
    expect(newState.user.username).toEqual('udokho');
    expect(newState.user.id).toEqual('5a37b6bc21dfde711f9ad885');
  });

  it('should dispatch userInfo when edit user action is called', () => {
    const action = editProfileSuccess(userInfo);
    const newState = access(state, action);
    expect(newState.user.username).toEqual('udokho');
    expect(newState.user.id).toEqual('5a37b6bc21dfde711f9ad885');
  });
});
