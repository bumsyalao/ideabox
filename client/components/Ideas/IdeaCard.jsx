import React, { Component } from 'react';
import 'react-mde/lib/styles/css/react-mde-all.css';
import * as Showdown from 'showdown';

/**
 *
 *
 * @class IdeaCard
 * @extends {Component}
 */
class IdeaCard extends Component {
  /**
   * Creates an instance of IdeaCard.
   * @param {any} props
   * @return {void}
   * @memberOf IdeaCard
   */
  constructor(props) {
    super(props);
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
      $('.modal').modal();
    });
    const { title, description, category, authorName } = this.props;
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
              <a>
                <i
                  className="tiny material-icons icon-btn tooltipped"
                  data-position="bottom"
                  data-delay="50"
                  data-tooltip="get link"
                >
                  insert_link
                </i>
              </a>
            </li>
            <li>
              <a className="modal-trigger">
                <i
                  className="tiny material-icons icon-btn tooltipped"
                  data-position="bottom"
                  data-delay="50"
                  data-tooltip="comment"
                >
                  insert_comment
                </i>
              </a>
              <div id="modal1" className="modal">
                <div className="modal-content">
                  <h4>Modal Header</h4>
                  <p>A bunch of text</p>
                </div>
                <div className="modal-footer">
                  <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
              </div>
            </li>
            <li>
              <a>
                <i
                  className="tiny material-icons icon-btn tooltipped"
                  data-position="bottom"
                  data-delay="50"
                  data-tooltip="post to twitter"
                >
                  share
                </i>
              </a>
            </li>
          </ul>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            <i className="material-icons right">close</i>
          </span>
          <p dangerouslySetInnerHTML={{ __html: mdDescription }} />
        </div>
      </div>
    );
  }
}

export default IdeaCard;
