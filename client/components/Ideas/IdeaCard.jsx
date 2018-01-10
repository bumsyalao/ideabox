import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Showdown from 'showdown';

/**
 * Idea card class
 *
 * @class IdeaCard
 * @extends {Component}
 */
export class IdeaCard extends Component {

  /**
   * Creates an instance of IdeaCard.
   * @param {object} props
   *
   * @memberOf IdeaCard
   */
  constructor(props) {
    super(props);
    this.copyLink = this.copyLink.bind(this);
  }

  /**
   * Functo to copy to clipboard
   *
   * @param {string} text
   * @returns {void}
   * @memberOf IdeaCard
   */
  copyLink(text) {
    if (window.clipboardData && window.clipboardData.setData) {
      // IE specific code path to prevent textarea being shown while dialog is visible.
      return clipboardData.setData('Text', text);
    } else if (
      document.queryCommandSupported &&
      document.queryCommandSupported('copy')
    ) {
      const textarea = document.createElement('textarea');
      textarea.textContent = text;
      textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        return document.execCommand('copy'); // Security exception may be thrown by some browsers.
      } catch (ex) {
        console.warn('Copy to clipboard failed.', ex);
        return false;
      } finally {
        document.body.removeChild(textarea);
        Materialize.toast('Copied to clipboard', 5000, 'green');
      }
    }
  }

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
                id={id}
                href={`${window.location.origin}/view/${id}`}
                onClick={(event) => {
                  event.preventDefault();
                  this.copyLink(`${window.location.origin}/view/${id}`);
                }}
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
                  remove_red_eye
                </i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            <i className="material-icons right">close</i>
          </span>
          <p
            dangerouslySetInnerHTML={{ __html: mdDescription }}
            className="truncate"
          />
        </div>
      </div>
    );
  }
}

export default IdeaCard;
