import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserIdeaCard from './UserIdeaCard';
import { getUserIdeas } from '../../actions/ideaAction';

/**
 * User Idea Component
 * @class UserIdeaList
 * @extends {Component}
 */
class IdeaList extends Component {

  /**
   * Makes an action call to get user ideas
   * @return {void}
   * @memberOf UserIdeaList
   */
  componentWillMount() {
    this.props.getUserIdeas().catch();
  }

  /**
   * Renders User Idea list
   * @returns {void}
   *
   * @memberOf UserIdeaList
   */
  render() {
    return (
      <div className="idea-list grid">
        {this.props.ideas.map(idea => (
          <UserIdeaCard
            key={idea._id}
            id={idea._id}
            title={idea.title}
            description={idea.description}
            category={idea.category}
            authorName={idea.authorName}
            access={idea.access}
            modified={idea.modified}
          />
        ))}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ideas: state.ideas.myIdeas
});
export default connect(mapStateToProps, { getUserIdeas })(IdeaList);
