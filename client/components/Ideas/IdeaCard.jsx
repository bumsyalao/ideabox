import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Showdown from 'showdown';

/**
 * Idea card class
 *
 * @class IdeaCard
 * @extends {Component}
 */
class IdeaCard extends Component {

  /**
   * Renders Idea card class
   * @returns {void}
   *
   * @memberOf IdeaCard
   */
  render() {
    $(document).ready(() => {
      $('.tooltipped').tooltip({ delay: 50 });
    });
    $('.tooltipped').tooltip('remove');
    const { title, description, category, authorName, id } = this.props;
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
          <div className="category-text">{category}</div>
        </div>
        <div className="card-action">
          <ul className="card-icons">
            <li>
              <a
                href={`${window.location.origin}/dashboard/view/${id}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <i
                  className="tiny material-icons icon-btn tooltipped"
                  data-position="bottom"
                  data-delay="50"
                  data-tooltip="copy link"
                >
                  insert_link
                </i>
              </a>
            </li>
            <li>
              <Link to={`/dashboard/view/${id}`}>
                <i
                  className="tiny material-icons icon-btn tooltipped"
                  data-position="bottom"
                  data-delay="50"
                  data-tooltip="view article"
                >
                  insert_comment
                </i>
              </Link>
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

export default IdeaCard;
