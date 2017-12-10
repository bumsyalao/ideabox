import * as types from '../actions/types';

const initialState = {
  ideas: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LIST_PUBLIC_IDEAS:
      return {
        ...state,
        ideas: action.foundIdeas
      };
    default: return state;
  }
};
