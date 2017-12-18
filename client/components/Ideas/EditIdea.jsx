import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactMde, { ReactMdeCommands } from 'react-mde';
import { editIdea, getUserIdeas, getIdea } from '../../actions/ideaAction';

/**
 * Edit Idea Class
 *
 * @class EditIdea
 * @extends {Component}
 */
class EditIdea extends Component {
  /**
   * Creates an instance of EditIdea.
   * @param {any} props
   *
   * @memberOf EditIdea
   */
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.idea.title,
      description: this.props.idea.description || {},
      category: this.props.idea.category,
      access: this.props.idea.access
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

/**
 * Makes a call to get Idea
 *
 * @return {void}
 * @memberOf EditIdea
 */
  componentWillMount() {
    const ideaId = this.props.match.params.ideaId;
    this.props.getIdea(ideaId)
      .then(() => {
        this.setState({
          title: this.props.idea.title,
          category: this.props.idea.category,
          description: this.props.idea.description,
          access: this.props.idea.access
        });
      });
  }
/**
 * Updates state if props are changed
 * @param {any} nextProps
 * @return {void}
 * @memberOf EditIdea
 */
  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.idea.title,
      description: nextProps.idea.description,
      category: nextProps.idea.category,
      access: nextProps.idea.access
    });
  }
  /**
   * Sets the event value to the state
   * @param {object} event
   * @return {void}
   * @memberOf EditIdea
   */
  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  /**
   * Sets the event value to the state
   * @param {object} value
   * @return {void}
   * @memberOf CreateIdea
   */
  handleValueChange = (value) => {
    this.setState({ description: value });
  }

  /**
   * Makes a call to edit Idea
   * @param {object} event
   * @return {void}
   * @memberOf EditIdea
   */
  onSubmit(event) {
    event.preventDefault();
    const { ideaId } = this.props.match.params;
    const accessType = $('#switch-btn').is(':checked') ? 'public' : 'private';
    const descriptionMde = this.state.description.text;
    const newIdea = {
      title: this.state.title,
      description: descriptionMde,
      category: this.state.category,
      access: accessType
    };
    this.props.editIdea(newIdea, ideaId)
      .then(() => {
        Materialize.toast('Your Idea has been updated', 5000, 'green');
        this.props.history.push('/dashboard/my-ideas');
      }).catch((err) => {
        Materialize.toast(err.response.data.message, 5000, 'red');
      });
  }
  /**
   * Renders Edit Idea component
   * @returns {void}
   *
   * @memberOf EditIdea
   */
  render() {
    $(document).ready(() => {
      $('select').material_select();
      $('#switch-btn').prop('checked');
      $('.tooltipped').tooltip({ delay: 50 });
    });
    $('.tooltipped').tooltip('remove');
    return (
      <div className="create-idea">
        <div className="row">
          <h4> Edit Idea </h4>
          <form className="col s12 form-margin">
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  type="text"
                  className="validate"
                />
              </div>
            </div>
            <div className="input-field col s12">
              <select
                className="browser-default"
                name="category"
                id="category"
                value={this.state.category}
                onChange={this.onChange}
              >
                <option value="" disabled selected>
                    Choose a category
                </option>
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
            <div className="input-field col s12">
              <ReactMde
                textAreaProps={{
                  id: 'description',
                  name: 'description',
                }}
                id="description"
                value={this.state.description}
                onChange={this.handleValueChange}
                commands={ReactMdeCommands.getDefaultCommands()}
              />
            </div>
            <div className="switch">
              <label>
                  Private Idea
                <input id="switch-btn" type="checkbox" value={this.state.access} />
                <span className="lever" />
                  Public Idea
              </label>
              <p> Public Ideas can be seen by everyone </p>
            </div>
            <button
              className="waves-effect waves-light btn right"
              onClick={this.onSubmit}
            >Save Idea</button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.access.user,
  ideas: state.ideas.ideas,
  idea: state.ideas.idea,

});

export default connect(mapStateToProps, { editIdea, getUserIdeas, getIdea })(
  withRouter(EditIdea));
