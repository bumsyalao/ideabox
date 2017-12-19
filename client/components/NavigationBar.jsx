import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ideaboxlogo from '../../client/images/idea logo.png';
import { logoutRequest } from '../actions/userAction';

/**
 * NavigationBar component
 *
 * @class NavigationBar
 * @extends {Component}
 */
class NavigationBar extends Component {
  /**
   * Creates an instance of NavigationBar.
   * Binds clsss methods
   * @param {object} props
   * @return {void}
   * @memberOf Dashboard
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  /**
   * Logout Function
   * Prevent default action of event
   * @param {object} event
   * @return {void}
   *
   * @memberOf NavigationBar
   */
  logout(event) {
    event.preventDefault();
    this.props.logoutRequest();
    this.props.history.push('/');
    Materialize.toast('You have logged out successfully', 3000, 'green');
  }

  /**
   *
   *
   * @returns {void}
   *
   * @memberOf NavigationBar
   */
  render() {
    $(document).ready(() => {
      $('.button-collapse').sideNav();
      $('.tooltipped').tooltip({ delay: 50 });
    });
    return (
      <div className="nav-style nav">
        <ul id="slide-out" className="side-nav">
          <li>
            <div className="user-view">
              <div className="background">
                <img src="images/office.jpg" />
              </div>
              <img className="img-logo" src={ideaboxlogo} />
              <a href="#!name">
                <span className="black-text name">{this.props.access.username}</span>
              </a>
              <a href="#!email">
                <span className="black-text email">{this.props.access.email}</span>
              </a>
            </div>
          </li>
          <li>
            <Link to="/dashboard/user-update" href="#!">
              <i className="material-icons">person_outline</i>Edit Profile
            </Link>
          </li>
          <li>
            <div className="divider" />
          </li>
          <li>
            <Link to="/dashboard/my-ideas" className="waves-effect" href="#!">
              <i className="material-icons">lightbulb_outline</i>
              My Ideas
            </Link>
          </li>
        </ul>
        <a
          href="#"
          className="button-collapse tooltipped"
          data-position="bottom"
          data-delay="50"
          data-tooltip="Menu"
          data-activates="slide-out"
        >
          <i className="material-icons">menu</i>
        </a>
        <div className="nav-items">
          <Link
            to="/dashboard/idea-list"
            href="#"
            className="tooltipped"
            data-position="bottom"
            data-delay="50"
            data-tooltip="Home"
          >
            <i className="material-icons">home</i>
          </Link>
          <Link
            to="/dashboard/create-idea"
            href="#"
            className="tooltipped"
            data-position="bottom"
            data-delay="50"
            data-tooltip="Create Idea"
          >
            <i className="material-icons">add_circle_outline</i>
          </Link>
          <a
            href="#"
            onClick={this.logout}
            className="tooltipped"
            data-position="bottom"
            data-delay="50"
            data-tooltip="Logout"
          >
            <i className="material-icons">power_settings_new</i>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  access: state.access.user
});

export default connect(mapStateToProps, { logoutRequest })(withRouter(NavigationBar));

