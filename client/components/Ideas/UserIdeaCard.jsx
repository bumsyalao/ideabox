import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Showdown from 'showdown';

import { deleteIdea } from '../../actions/ideaAction';

/**
 *
 *
 * @class IdeaCard
 * @extends {Component}
 */
class UserIdeaCard extends Component {

  /**
   * Creates an instance of IdeaCard.
   * @param {any} props
   * @return {void}
   * @memberOf IdeaCard
   */
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  /**
   *
   *
   * @return {void}
   * @memberOf IdeaCard
   */
  onDelete() {
    const ideaId = this.props.id;
    this.props.deleteIdea(ideaId);
    $('.tooltipped').tooltip('remove');
  }
  /**
   *
   *
   * @returns {void}
   *
   * @memberOf IdeaCard
   */
  render() {
    $(document).ready(() => {
      $('.tooltipped').tooltip({ delay: 50 });
    });
    const { title, description, category, authorName, modified, access, id } = this.props;
    const converter = new Showdown.Converter();
    const mdDescription = converter.makeHtml(description);
    return (
      <div className="grid-item card hoverable">
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">
            {title}
            <i className="material-icons right">more_vert</i>
          </span>
          <p> By: {authorName} </p>
          <p className="right">{ modified && 'Edited' }</p>
          <div className="category-text">{category}</div>
          <p>access type: {access}</p>
        </div>
        <div className="card-action">
          <ul className="card-icons">
            <li>
              <Link to={`/dashboard/edit/${id}`}>
                <i
                  className="tiny material-icons icon-btn tooltipped"
                  data-position="bottom"
                  data-delay="50"
                  data-tooltip="edit"
                >
                  edit
                </i>
              </Link>
            </li>
            <li>
              <a
                onClick={this.onDelete}
              >
                <i
                  className="tiny material-icons icon-btn tooltipped delete-btn"
                  data-position="bottom"
                  data-delay="50"
                  data-tooltip="delete"
                >
                  delete
                </i>
              </a>
            </li>
          </ul>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            <i className="material-icons right">close</i>
          </span>
          <p dangerouslySetInnerHTML={{ __html: mdDescription }} className="truncate" />
        </div>
      </div>
    );
  }
}

export default connect(null, { deleteIdea })(UserIdeaCard);
