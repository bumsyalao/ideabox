import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forgotPasswordAction } from '../../actions/userAction';
import ideaboxlogo from '../../images/idea logo.png';

/**
 * Forgot Password Component
 * @class ForgotPassword
 * @extends {Component}
 */
export class ForgotPassword extends Component {
  /**
   * Creates an instance of ForgotPassword.
   * @param {object} props
   *
   * @memberOf ForgotPassword
   */
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.onChange = this.onChange.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }
  /**
   *
   * Sets the event value to the state
   * @param {object} event
   * @return {void}
   * @memberOf ForgotPassword
   */
  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  /**
   * Forgot Password method
   * Makes an action call to to forgotPasswordAction
   * @return {void}
   * @memberOf ForgotPassword
   */
  forgotPassword() {
    const email = this.state.email;
    this.props
      .forgotPasswordAction({ email })
      .then(() => {
        this.props.history.push('/auth');
        Materialize.toast('Password Reset Mail Sent', 5000, 'green');
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, 5000, 'red');
      });
  }

  /**
   * Renders Forgot password component
   *
   * @returns {void} HTML component
   *
   * @memberOf ForgotPassword
   */
  render() {
    return (
      <div className="bkg-image">
        <img className="logo-img" src={ideaboxlogo} />
        <div className="col s12 container forgot-password">
          <div className="input-field col s6 offset-s3">
            <i className="material-icons prefix">email</i>
            <input
              id="email"
              value={this.state.email}
              onChange={this.onChange}
              name="email"
              type="text"
              className="validate"
              required
            />
            <label className="active" htmlFor="credential">
              Type in your email address so we can send you instructions to
              reset your password
            </label>
          </div>
          <div className="input-field col s6 offset-s3">
            <button
              id="submit-forgotPassword"
              onClick={this.forgotPassword}
              className="btn waves-effect waves-light col s6 offset-s3"
              name="action"
            >
              Send
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { forgotPasswordAction })(ForgotPassword);
