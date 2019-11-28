import { combineReducers } from 'redux';

import access from './accessReducer';
import ideas from './ideaReducer';

export default combineReducers({
  access,
  ideas
});
