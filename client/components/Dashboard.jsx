import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import CreateIdea from '../components/Ideas/CreateIdea';
import IdeaList from '../components/Ideas/IdeaList';
import UserIdeaList from '../components/Ideas/UserIdeaList';
import EditIdea from '../components/Ideas/EditIdea';
import EditProfile from '../components/User/EditProfile';
import ViewIdea from '../components/Ideas/ViewIdea';
import PageNotFound from '../components/PageNotFound';

/**
 * Dashboard Component
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
   * Renders Dashboard Component
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
          <Route
            path={`${this.props.match.url}/idea-list`}
            component={IdeaList}
          />
          <Route
            path={`${this.props.match.url}/my-ideas`}
            component={UserIdeaList}
          />
          <Route
            path={`${this.props.match.url}/edit/:ideaId`}
            component={EditIdea}
          />
          <Route
            path={`${this.props.match.url}/user-update`}
            component={EditProfile}
          />
          <Route
            path={`${this.props.match.url}/view/:ideaId`}
            component={ViewIdea}
          />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  access: state.access
});
export default connect(mapStateToProps, null)(withRouter(Dashboard));
