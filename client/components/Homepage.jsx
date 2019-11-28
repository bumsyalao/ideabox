import React from 'react';
import { Link } from 'react-router-dom';
import ideaboxlogo from '../../client/images/idea logo.png';

/**
 * @function Homepage
 * @return {void}
 */
const Homepage = () => (
  <div>
    { $('.tooltipped').tooltip('remove') }
    <div className="section no-pad-bot bkg-style" id="index-banner">
      <div className="homepage">
        <br />
        <div className="center">
          <img src={ideaboxlogo} />
        </div>
        <div className="row center">
          <h3 className="header col s12 light">Think inside the box!</h3>
        </div>
        <div className="row center">
          <Link
            to="/auth"
            id="download-button"
            className="btn-large waves-effect waves-light amber black-text"
          >
            Get Started
          </Link>{' '}
        </div>
        <br />
      </div>
    </div>
  </div>
);

export default Homepage;
