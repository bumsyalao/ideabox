import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import CreateIdea from '../components/Ideas/CreateIdea';

/**
 *
 *
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
  /**
   *
   * Check if user is authenticated
   * Toast access message
   * Intialize materialize collapsible
   * @return {void}
   * @memberOf Dashboard
   */
  componentDidMount() {
    if (!this.props.access.isAuthenticated) {
      Materialize.toast('Please Login or Register', 5000, 'red');
      this.props.history.push('/auth');
    }
  }
  /**
   *
   *
   * @returns {void}
   *
   * @memberOf Dashboard
   */
  render() {
    return (
      <div className="dashboard">
        <NavigationBar />
        <Switch>
          <Route
            path={`${this.props.match.url}/create-idea`}
            component={CreateIdea}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  access: state.access
});
export default connect(mapStateToProps, null)(withRouter(Dashboard));
