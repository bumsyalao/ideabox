import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import IdeaCard from './IdeaCard';
import { getPublicIdeas, searchIdeas } from '../../actions/ideaAction';

/**
 * Idea list component
 * @class IdeaList
 * @extends {Component}
 */
export class IdeaList extends Component {
  /**
   * Creates an instance of IdeaList.
   * @param {any} props
   * @return {void}
   * @memberOf IdeaList
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
    this.onCancel = this.onCancel.bind(this);
  }
  /**
   * Makes an action call to get Ideas
   * @return {void}
   * @memberOf IdeaList
   */
  componentWillMount() {
    this.props.getPublicIdeas().catch();
  }

  /**
   * Update the state if the props are changed
   * @param {object} nextProps
   * @return {void}
   * @memberOf IdeaList
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      pageCount: nextProps.pagination.pageCount,
      count: nextProps.pagination.count,
      ideas: nextProps.ideas,
      foundIdeas: nextProps.foundIdeas
    });
  }
  /**
   * Makes an action call to search for ideas
   *
   * @param {int} offset
   * @param {int} limit
   * @return {void}
   * @memberOf IdeaList
   */
  onSearch() {
    const limit = 9;
    const offset = 0;
    this.props.searchIdeas(
      offset,
      limit,
      this.state.searchParam,
      this.state.category
    )
    .then(() => this.setState({
      title: this.props.foundIdeas.title,
      id: this.props.foundIdeas._id,
      description: this.props.foundIdeas.description,
      access: this.props.foundIdeas.access,
      authorName: this.props.foundIdeas.authorName
    }));
  }
  /**
   * Sets the event value to the state
   * @param {object} event
   * @return {void}
   * @memberOf IdeaList
   */
  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
   * Updates state when function is called
   * @return {void}
   * @memberOf IdeaList
   */
  onCancel() {
    this.setState({
      searchParam: '',
      foundIdeas: []
    });
  }

  /**
   * Pagination for list of ideas
   * @param {object} pageData
   * @return {void}
   * @memberOf Ideas
   */
  handlePageClick(pageData) {
    const selected = pageData.selected;
    const limit = 20;
    const offset = Math.ceil(selected * limit);
    this.setState({ offset });
    this.getIdeas(offset, limit);
  }

  /**
   * Renders Idea list component
   * @returns {void}
   *
   * @memberOf IdeaList
   */
  render() {
    let result = this.state.ideas || [];

    if (this.state.foundIdeas && this.state.foundIdeas.length > 0) {
      result = this.state.foundIdeas;
    }

    return (
      <div>
        <div className="row search-row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s3 inline right white-text">
                <a
                  className="row waves-effect waves-light right cancel-btn"
                  onClick={this.onCancel}
                ><i className="material-icons icon-btn">cancel</i></a>
                <input
                  id="searchParam"
                  value={this.state.searchParam}
                  onChange={this.onChange}
                  type="text"
                  className="validate"
                />
                <label htmlFor="search-param">Search Idea</label>
              </div>
              </div>
              <div className="row input-field col s3 right">
                <select
                  className="browser-default"
                  name="category"
                  id="category"
                  value={this.state.category}
                  onChange={this.onChange}
                >
                  <option value="" disabled selected>Filter by category</option>
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
              <a
                className="row waves-effect waves-light right"
                onClick={this.onSearch}
              ><i className="material-icons">search</i></a>
              </div>
          </form>
        </div>
        <div className="idea-list grid grid-margin">
          {result.map(idea => (
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
  ideas: state.ideas.ideas,
  foundIdeas: state.ideas.foundIdeas,
  pagination: state.ideas.pagination
});
export default connect(mapStateToProps, { getPublicIdeas, searchIdeas })(IdeaList);
