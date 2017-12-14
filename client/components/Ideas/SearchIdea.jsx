import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { searchIdeas } from '../../actions/ideaAction';
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
    this.onSearch = this.onSearch.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Update the state if the props are changed
   * @param {object} nextProps
   * @return {void}
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
    const limit = 9;
    const offset = 0;
    this.props.searchIdeas(
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
      <div className="container">
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
                <option value="Arts and Entertainment">arts and entertainment</option>
                <option value="Cars and other vehicles">cars and other vehicles</option>
                <option value="Computers and Electronics">computers and electronics</option>
                <option value="Education and Communication">education and communication</option>
                <option value="Family Life">family life</option>
                <option value="Finance and Business">finance and business</option>
                <option value="Food and Entertaining">food and entertaining</option>
                <option value="Health">health</option>
                <option value="Hobbies and Craft">hobbies and craft</option>
                <option value="Holidays and Traditions">holidays and traditions</option>
                <option value="Home and Gardens">home and gardens</option>
                <option value="Personal care and Style">personal care and style</option>
                <option value="Pets and Aminals">pets and aminals</option>
                <option value="Philosophy and Religion">philosophy and religion</option>
                <option value="Relationships">relationships</option>
                <option value="Sports and Finance">sports and finance</option>
                <option value="Travel">travel</option>
                <option value="Work world">work world</option>
                <option value="Youth">youth</option>
              </select>
            </div>
            <a
              className="waves-effect waves-light btn right"
              onClick={this.onSearch}
            >Search</a>
          </div>
        </form>
      </div>
      <div className="idea-list grid">
      {this.state.ideas.map(idea => (
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
        {(this.state.count > 9) && <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />}
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  foundIdeas: state.ideas.foundIdeas,
  pagination: state.ideas.pagination
});


export default connect(mapStateToProps, { searchIdeas })(SearchIdea);
