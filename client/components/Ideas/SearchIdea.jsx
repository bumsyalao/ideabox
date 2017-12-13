import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIdeas } from '../../actions/ideaAction';
import IdeaCard from './IdeaCard';

/**
 *
 *
 * @class SearchIdea
 * @extends {Component}
 */
class SearchIdea extends Component {

  /**
   * Creates an instance of SearchIdea.
   * @param {any} props
   *
   * @memberOf SearchIdea
   */
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
      searchParam: '',
      category: ''
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Update the state if the props are changed
   * @param {object} nextProps
   * @memberOf UsersPage
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      ideas: nextProps.foundIdeas,
      pageCount: nextProps.pagination.pageCount,
      count: nextProps.pagination.count
    });
  }

  /**
   *
   *
   * @param {int} offset
   * @param {int} limit
   * @return {void}
   * @memberOf SearchIdea
   */
  onSearch() {
    const limit = 20;
    const offset = 0;
    this.props.getIdeas(
      offset,
      limit,
      this.state.searchParam,
      this.state.category
    );
  }

  /**
   *
   *
   * @param {object} event
   * @return {void}
   * @memberOf CreateIdea
   */
  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  /**
   * Pagination for list of users
   * @param {object} pageData
   * @return {void}
   * @memberOf UsersPage
   */
  handlePageClick(pageData) {
    const selected = pageData.selected;
    const limit = 20;
    const offset = Math.ceil(selected * limit);
    this.setState({ offset });
    this.getIdeas(offset, limit);
  }

  /**
   *
   *
   * @returns {void}
   *
   * @memberOf SearchIdea
   */
  render() {
    return (
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6 inline">
              <input
                id="searchParam"
                value={this.state.searchParam}
                onChange={this.onChange}
                type="text"
                className="validate"
              />
              <label htmlFor="sear-param">Search Idea</label>
            </div>
            <div className="input-field col s6">
              <select
                className="browser-default"
                name="category"
                id="category"
                value={this.state.category}
                onChange={this.onChange}
              >
                <option value="" disabled selected>Choose a category</option>
                <option value="Arts and Entertainment">Arts and Entertainment</option>
                <option value="Cars and other vehicles">Cars and other vehicles</option>
                <option value="Computers and Electronics">Computers and Electronics</option>
                <option value="Education and Communication">Education and Communication</option>
                <option value="Family Life">Family Life</option>
                <option value="Finance and Business">Finance and Business</option>
                <option value="Food and Entertaining">Food and Entertaining</option>
                <option value="Health">Health</option>
                <option value="Hobbies and Craft">Hobbies and Craft</option>
                <option value="Holidays and Traditions">Holidays and Traditions</option>
                <option value="Home and Gardens">Home and Gardens</option>
                <option value="Personal care and Style">Personal care and style</option>
                <option value="Pets and Aminals">Pets and Aminals</option>
                <option value="Philosophy and Religion">Philosophy and Religion</option>
                <option value="Relationships">Relationships</option>
                <option value="Sports and Finance">Sports and Finance</option>
                <option value="Travel">Travel</option>
                <option value="Work world">Work world</option>
                <option value="Youth">Youth</option>
              </select>
            </div>
            <a
              className="waves-effect waves-light btn right"
              onClick={this.getAllIdeas}
            >Search</a>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  foundIdeas: state.ideas.foundIdeas,
  pagination: state.ideas.pagination
});

export default connect(mapStateToProps, { getIdeas })(SearchIdea);
