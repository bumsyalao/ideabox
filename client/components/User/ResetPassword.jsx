import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { resetPasswordAction } from '../../actions/userAction';
import ideaboxlogo from '../../images/idea logo.png';

/**
 * Reset Password Component
 *
 * @class ResetPassword
 * @extends {Component}
 */
class ResetPassword extends Component {
  /**
   * Creates an instance of ResetPassword.
   * @param {any} props
   *
   * @memberOf ResetPassword
   */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: ''
    };
    this.onChange = this.onChange.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }
  /**
   *
   * Sets the event value to the state
   * @param {Object} event The event of the HTML component
   * @return {void}
   * @memberOf ResetPassword
   */
  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  /**
   * Function to reset password
   * Makes an action call to reset password
   * @return {void}
   * @memberOf ResetPassword
   */
  resetPassword() {
    const password = this.state.password;
    const pathname = this.props.location.pathname;
    const hash = pathname.replace('/update-password/', '');
    if (this.state.confirmPassword !== this.state.password) {
      Materialize.toast('Password does not match', 5000, 'red');
    } else {
      console.log('password ====', password);
      this.props
        .resetPasswordAction(password, hash)
        .then(() => {
          this.props.history.push('/dashboard/idea-list');
          Materialize.toast('Password Updated Successfully', 5000, 'green');
        })
        .catch(err =>
          Materialize.toast(err.response.data.message, 5000, 'red')
        );
    }
  }

  /**
   * Renders Forgot Password Component
   *
   * @returns {void}
   *
   * @memberOf ResetPassword
   */
  render() {
    return (
      <div className="bkg-image">
        <img className="logo-img" src={ideaboxlogo} />
        <div className="col s12 container forgot-password">
          <div className="input-field col s6 offset-s3">
            <i className="material-icons prefix">lock</i>
            <input
              id="password"
              value={this.state.password}
              onChange={this.onChange}
              name="password"
              type="password"
              className="validate"
              required
            />
            <label className="active" htmlFor="password">
              password
            </label>
          </div>
          <div className="input-field col s6 offset-s3">
            <i className="material-icons prefix">lock</i>
            <input
              id="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.onChange}
              name="confirmPassword"
              type="password"
              className="validate"
              required
            />
            <label className="active" htmlFor="confirmPassword">
              confirm password
            </label>
          </div>
          <div className="input-field col s6 offset-s3">
            <button
              id="resetPassword"
              onClick={this.resetPassword}
              className="btn waves-effect waves-light col s6 offset-s3"
              name="action"
            >
              Reset Password
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(
  connect(null, { resetPasswordAction })(ResetPassword)
);
