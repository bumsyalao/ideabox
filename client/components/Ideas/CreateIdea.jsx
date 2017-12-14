import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ReactMde, { ReactMdeCommands } from 'react-mde';
import { createIdea } from '../../actions/ideaAction';


/**
 * Create Idea component
 *
 * @class CreateIdea
 * @extends {Component}
 */
class CreateIdea extends Component {
  /**
   * Creates an instance of CreateIdea.
   * @param {any} props
   *
   * @memberOf CreateIdea
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      category: '',
      access: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
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
   * Sets the event value to the state
   * @param {object} event
   * @return {void}
   * @memberOf CreateIdea
   */
  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
   * Makes a call to create new Idea
   * @param {object} event
   * @return {void}
   * @memberOf CreateIdea
   */
  onSubmit(event) {
    event.preventDefault();
    const accessType = $('#switch-btn').is(':checked') ? 'public' : 'private';
    const descriptionMde = this.state.description.text;
    const newIdea = {
      title: this.state.title,
      description: descriptionMde,
      category: this.state.category,
      access: accessType
    };
    this.props.createIdea(newIdea)
      .then(() => {
        Materialize.toast('Your Idea has been created', 5000, 'green');
      }).catch((err) => {
        Materialize.toast(err.response.data.message, 5000, 'red');
      });
  }
  /**
   * renders create idea component
   * @returns {void}
   *
   * @memberOf CreateIdea
   */
  render() {
    $(document).ready(function() {
      $('select').material_select();
      $('#switch-btn').prop('checked');
      $('.tooltipped').tooltip({ delay: 50 });
    });
    $('.tooltipped').tooltip('remove');
    return (
      <div className="create-idea">
        <div className="row">
          <Link
            to="/dashboard/idea-list"
            className="btn tooltipped btn-floating btn-large waves-effect waves-light red close-btn right"
            data-position="bottom"
            data-delay="50"
            data-tooltip="close"
          >
            <i
              className="material-icons"
            >close</i></Link>
          <h4> Write down that Idea! </h4>
          <form className="col s12 form-margin">
            <div className="row">
              <div className="input-field col s12 inline">
                <input
                  id="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  type="text"
                  className="validate"
                />
                <label htmlFor="Title">Title</label>
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
            <div className="col s12">
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
            >Create Idea</button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.access.user,
});

export default connect(mapStateToProps, { createIdea })(withRouter(CreateIdea));
