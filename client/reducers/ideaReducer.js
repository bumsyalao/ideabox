import * as types from '../actions/types';

const initialState = {
  ideas: [],
  myIdeas: [],
  idea: {},
  foundIdeas: [],
  pagination: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LIST_PUBLIC_IDEAS:
      return {
        ...state,
        ideas: action.foundIdeas
      };
    case types.LIST_FOUND_IDEAS:
      return {
        ...state,
        foundIdeas: action.foundIdeas
      };
    case types.LIST_USER_IDEAS:
      return {
        ...state,
        myIdeas: action.foundIdeas
      };
    case types.GET_IDEA:
      return {
        ...state,
        idea: action.foundIdea
      };
    default: return state;
  }
};

