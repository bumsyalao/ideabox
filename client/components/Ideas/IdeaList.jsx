import React, { Component } from 'react';
import { connect } from 'react-redux';
import IdeaCard from './IdeaCard';
import { getPublicIdeas } from '../../actions/ideaAction';

/**
 *
 *
 * @class IdeaList
 * @extends {Component}
 */
class IdeaList extends Component {
  /**
   * Creates an instance of IdeaList.
   * @param {any} props
   * @return {void}
   * @memberOf IdeaList
   */
  constructor(props) {
    super(props);
  }

  /**
   *
   *
   * @return {void}
   * @memberOf IdeaList
   */
  componentWillMount() {
    this.props.getPublicIdeas().catch();
  }

  /**
   *
   *
   * @returns {void}
   *
   * @memberOf IdeaList
   */
  render() {
    return (
      <div className="idea-list grid">
        {this.props.ideas.map(idea => (
          <IdeaCard
            key={idea._id}
            id={idea._id}
            title={idea.title}
            description={idea.description}
            category={idea.category}
            authorName={idea.authorName}
            access={idea.access}
          />
        ))}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ideas: state.ideas.ideas
});
export default connect(mapStateToProps, { getPublicIdeas })(IdeaList);
