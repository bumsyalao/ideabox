import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loginRequest, registerRequest } from '../../actions/userAction';
import ideaboxlogo from '../../images/idea logo.png';

/**
 * Auth Component
 *
 * @class Register
 * @extends {Component}
 */
export class Auth extends Component {
  /**
   * Creates an instance on Register form
   * Creates an instance of Register.
   * @param {object} props
   *
   * @memberOf Register
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      loggedIn: false
    };
    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }
  /**
   *
   * Check if user is authenticated
   * Directs user to homepage if user is already signed in
   * @returns {void}
   *
   * @memberOf Homepage
   */
  componentDidMount() {
    if (this.props.access.isAuthenticated) {
      this.props.history.push('/dashboard/idea-list');
    }
    $('.tooltipped').tooltip('remove');
     // Variables
    const signupButton = document.getElementById('signup-button');
    const loginButton = document.getElementById('login-button');
    const userForms = document.getElementById('user_options-forms');
      // Add event listener to the "Sign Up" button
    signupButton.addEventListener('click', () => {
      userForms.classList.remove('login-click');
      userForms.classList.add('signup-click');
    }, false);
      // Add event listener to the "Login" button
    loginButton.addEventListener('click', () => {
      userForms.classList.remove('signup-click');
      userForms.classList.add('login-click');
    }, false);
  }

  /**
   * Sets the event value to the state
   * @return {void}
   * @param {Object} event The event of the HTML component
   *
   * @memberOf Register
   */
  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
   * Validates the Login Form
   * Makes an action call to login in the user
   * Toasts the error/success message
   * @param {object} event
   * @return {void}
   *
   *
   * @memberOf Auth
   */
  onLogin(event) {
    event.preventDefault();
    const loginInfo = {
      username: this.state.username,
      password: this.state.password
    };
    this.props
      .loginRequest(loginInfo)
      .then((res) => {
        this.setState({ loggedIn: true });
        this.props.history.push('/dashboard/idea-list');
        Materialize.toast(res.message, 3000, 'green');
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, 3000, 'red');
      });
  }

  /**
   * Validates Register form
   * Makes an action call to register user
   * @param {object} event
   * @return {void}
   * @memberOf Auth
   */
  onRegister(event) {
    event.preventDefault();
    const registerInfo = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    this.props
      .registerRequest(registerInfo)
      .then((res) => {
        this.setState({ loggedIn: true });
        this.props.history.push('/dashboard/idea-list');
        Materialize.toast(res.message, 3000, 'green');
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, 3000, 'red');
      });
  }
  /**
   *
   * renders Auth component
   * @returns {void} Register and Login form
   * @memberOf Auth
   */
  render() {
    return (
      <div className="bkg-image">
        <img className="logo-img" src={ideaboxlogo} />
        <section className="user">
          <div className="user_options-container">
            <div className="user_options-text">
              <div className="user_options-unregistered">
                <h2 className="user_unregistered-title">
                  Dont have an account?
                </h2>
                <p className="user_unregistered-text">
                  Ideabox is a simple application that allows users to create a
                  pool of ideas and promote collaboration
                </p>
                <button className="user_unregistered-signup" id="signup-button">
                  Sign up
                </button>
              </div>
              <div className="user_options-registered">
                <h2 className="user_registered-title">Have an account?</h2>
                <p className="user_registered-text">
                  Ideabox is a simple application that allows users to create a
                  pool of ideas and promote collaboration
                </p>
                <button className="user_registered-login" id="login-button">
                  Login
                </button>
              </div>
            </div>
            <div
              className="user_options-forms input-field"
              id="user_options-forms"
            >
              <div className="user_forms-login">
                <h2 className="forms_title">Login</h2>
                <form className="forms_form">
                  <fieldset className="forms_fieldset">
                    <div className="forms_field">
                      <input
                        id="username"
                        value={this.state.username}
                        onChange={this.onChange}
                        type="username"
                        placeholder="username"
                        className="forms_field-input"
                        required
                      />
                    </div>
                    <div className="forms_field">
                      <input
                        id="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                        className="forms_field-input"
                        required
                      />
                    </div>
                  </fieldset>
                  <div className="forms_buttons">
                    <Link to="/forgot-password" type="button" className="forms_buttons-forgot">
                      Forgot password?
                    </Link>
                    <input
                      id="login-btn"
                      onClick={this.onLogin}
                      type="submit"
                      value="Log In"
                      className="forms_buttons-action"
                    />
                  </div>
                </form>
              </div>
              <div className="user_forms-signup">
                <h2 className="forms_title">Sign Up</h2>
                <form className="forms_form">
                  <fieldset className="forms_fieldset">
                    <div className="forms_field">
                      <input
                        id="username"
                        value={this.state.username}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Username"
                        className="forms_field-input"
                        required
                      />
                    </div>
                    <div className="forms_field">
                      <input
                        id="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        type="email"
                        placeholder="Email"
                        className="forms_field-input"
                        required
                      />
                    </div>
                    <div className="forms_field">
                      <input
                        id="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                        className="forms_field-input"
                        required
                      />
                    </div>
                  </fieldset>
                  <div className="forms_buttons">
                    <input
                      id="register-btn"
                      onClick={this.onRegister}
                      type="submit"
                      value="Sign up"
                      className="forms_buttons-action"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  access: state.access
});

const actions = {
  loginRequest,
  registerRequest
};

export default connect(mapStateToProps, actions)(withRouter(Auth));
