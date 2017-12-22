import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editProfile } from '../../actions/userAction';

/**
 * Edit Profile component
 *
 * @class EditProfile
 * @extends {Component}
 */
export class EditProfile extends Component {
  /**
   * Creates an instance on EditProfile form
   * Creates an instance of Edit Profile.
   * @param {object} props
   *
   * @memberOf Register
   */
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.access.username,
      email: this.props.access.email
    };
    this.onChange = this.onChange.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  /**
   * Sets state to nextprops
   * @param {any} nextProps
   * @return {void}
   * @memberOf EditProfile
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.access.username,
      email: nextProps.access.email
    });
  }

  /**
   * Sets the event value to the state
   * @return {void}
   * @param {Object} event The event of the HTML component
   *
   * @memberOf Edit Profile
   */
  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  /**
   *
   *
   * @param {object} event
   * @return {void}
   * @memberOf EditProfile
   */
  editProfile(event) {
    event.preventDefault();
    const updatedInfo = {
      username: this.state.username,
      email: this.state.email
    };
    this.props.editProfile(updatedInfo)
      .then(() => {
        Materialize.toast('Your profile has been updated succesfuly', 3000, 'green');
      }).catch((error) => {
        Materialize.toast(error.response.data.message, 3000, 'red');
      });
  }

  /**
   * Renders Edit profile component
   *
   * @returns {void}
   *
   * @memberOf EditProfile
   */
  render() {
    return (
      <div className="create-idea">
        <div className="row">
          <Link
            to="/dashboard/idea-list"
            className="btn tooltipped btn-floating btn-large waves-effect waves-light red close-btn right"
            data-position="bottom"
            data-delay="50"
            data-tooltip="close"
          >
            <i className="material-icons">close</i>
          </Link>
          <h4> Edit Profile</h4>
          <form className="col s12 form-margin">
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  type="text"
                  className="validate"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  type="text"
                  className="validate"
                />
              </div>
            </div>
            <button
              id="submit-btn"
              className="waves-effect waves-light btn right"
              onClick={this.editProfile}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  access: state.access.user,
  updatedUser: state.access.updatedUser
});

export default connect(mapStateToProps, { editProfile })(EditProfile);
