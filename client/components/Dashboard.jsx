import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ideaboxlogo from '../../client/images/idea logo.png';
import { logoutRequest } from '../actions/authAction';

/**
 *
 *
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {

  /**
   * Creates an instance of Dashboard.
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
   * @memberOf Dashboard
   */
  render() {
    $('.button-collapse').sideNav();
    $(document).ready(function() {
      $('.tooltipped').tooltip({ delay: 50 });
    });
    return (
      <div className="dashboard">
        <div className="nav-style nav">
          <ul id="slide-out" className="side-nav">
            <li>
              <div className="user-view">
                <div className="background">
                  <img src="images/office.jpg" />
                </div>
                <img className="img-logo" src={ideaboxlogo} />
                <a href="#!name">
                  <span className="black-text name">John Doe</span>
                </a>
                <a href="#!email">
                  <span className="black-text email">jdandturk@gmail.com</span>
                </a>
              </div>
            </li>
            <li>
              <a href="#!">
                <i className="material-icons">person_outline</i>Edit Profile
              </a>
            </li>
            <li>
              <div className="divider" />
            </li>
            <li>
              <a className="waves-effect" href="#!">
                <i className="material-icons">lightbulb_outline</i>
                My Ideas
              </a>
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
          <div className="nav-button">
            <a
              href="#"
              className="tooltipped"
              data-position="bottom"
              data-delay="50"
              data-tooltip="Create Idea"
            >
              <i className="material-icons">add</i>
            </a>
            <a
              href="#"
              className="tooltipped"
              data-position="bottom"
              data-delay="50"
              data-tooltip="Search Ideas"
            >
              <i className="material-icons">search</i>
            </a>
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
        <div className="group-list" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  access: state.access.user
});

export default connect(mapStateToProps, { logoutRequest })(withRouter(Dashboard));
