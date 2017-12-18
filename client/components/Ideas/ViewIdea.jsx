import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Showdown from 'showdown';
import { getIdea, addComment } from '../../actions/ideaAction';
import twitterIcon from '../../images/twitter-icon.png';

/**
 * View Idea Component
 *
 * @class ViewIdea
 * @extends {Component}
 */
class ViewIdea extends Component {
  /**
   * Creates an instance of ViewIdea.
   * @param {any} props
   *
   * @memberOf ViewIdea
   */
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Makes an action to get Idea
   * @return {void}
   * @memberOf ViewIdea
   */
  componentWillMount() {
    $('.tooltipped').tooltip('remove');
    const ideaId = this.props.match.params.ideaId;
    this.props.getIdea(ideaId);
  }

  /**
   * Sets the event value to the state
   * @param {object} event
   * @return {void}
   * @memberOf CreateIdea
   */
  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
   * Makes an action call to add comment
   *
   * @param {any} event
   * @return {void}
   * @memberOf ViewIdea
   */
  onSubmit(event) {
    event.preventDefault();
    const ideaId = this.props.match.params.ideaId;
    const newComment = this.state.comment;
    this.props.addComment(ideaId, newComment)
    .then(() => {
      this.setState({
        comment: ''
      });
    });
  }

  /**
   * Renders View Idea component
   *
   * @return {void}
   * @memberOf ViewIdea
   */
  render() {
    $(document).ready(function() {
      $('.tooltipped').tooltip({ delay: 50 });
    });
    const converter = new Showdown.Converter();
    const mdDescription = converter.makeHtml(this.props.idea.description);
    const id = this.props.idea._id;
    return (
      <div className="dashboard">
      <div className="view-page-wrapper">
      <div className="view-page">
        <div className="row">
          <h4>{this.props.idea.title}</h4>
          <a
            href={`https://twitter.com/intent/tweet?text=This%20is%20amazing%20you%20should%20read%20it&url=${window.location.origin}/view/${id}`}
            className="tooltipped right"
            data-position="bottom"
            data-delay="50"
            data-tooltip="Like this? share on twitter"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              src={twitterIcon}
              height="50px"
              width="50px"
              className="right twitter-icon"
            />
          </a>
          <p> By: {this.props.idea.authorName} </p>
          <div className="description-body">
            <p dangerouslySetInnerHTML={{ __html: mdDescription }} />
          </div>
          <div className="comment-section">
            <ul>
              {this.props.idea.comments &&
                this.props.idea.comments.map(comment => (
                  <li key={comment._id}>
                    <p>@{comment.authorName}</p>
                    {comment.comment}
                  </li>
                ))}
            </ul>
          </div>
          <label htmlFor="textarea1">Add a comment</label>
          <textarea
            id="comment"
            value={this.state.comment}
            onChange={this.onChange}
            className="materialize-textarea"
          />
          <a onClick={this.onSubmit} className="waves-effect waves-light right">
            <i className="material-icons card-icons">send</i>
          </a>
        </div>
      </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  idea: state.ideas.idea
});

export default connect(mapStateToProps, { getIdea, addComment })(
  ViewIdea
);
