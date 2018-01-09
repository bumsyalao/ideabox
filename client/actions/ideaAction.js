import axios from 'axios';
import attachAuthToken from '../utils/attachAuthToken';
import { LIST_PUBLIC_IDEAS, LIST_FOUND_IDEAS, LIST_USER_IDEAS, GET_IDEA } from './types';

export const loadIdeas = foundIdeas => ({
  type: LIST_PUBLIC_IDEAS,
  foundIdeas
});

export const loadUserIdeas = foundIdeas => ({
  type: LIST_USER_IDEAS,
  foundIdeas
});

export const loadSearchIdeas = foundIdeas => ({
  type: LIST_FOUND_IDEAS,
  foundIdeas
});

export const loadIdeaSuccess = foundIdea => ({
  type: GET_IDEA,
  foundIdea
});

/**
 * api call to get public idea
 * @return {object} returns foundIdeas
 */
export const getPublicIdeas = () => dispatch =>
  axios
    .get('/api/v1/ideas')
    .then((response) => {
      dispatch(loadIdeas(response.data.foundIdeas));
    })
    .catch((error) => {
      throw error;
    });

/**
 * api call to get user ideas
 * @return {object} returns foundIdeas
 */
export const getUserIdeas = () => dispatch =>
  axios
    .get('/api/v1/idea')
    .then((response) => {
      dispatch(loadUserIdeas(response.data.foundIdeas));
    })
    .catch((error) => {
      throw error;
    });

/**
 * api call to create idea
 * @param {object} newIdea
 * @return {object} returns foundIdeas
 */
export const createIdea = newIdea => dispatch =>
  attachAuthToken(localStorage.getItem('token'))
    .post('/api/v1/idea', newIdea)
    .then(() => {
      dispatch(getPublicIdeas());
    })
    .catch((error) => {
      throw error;
    });

/**
 * api call to search idea
 * @param {object} offset, limit, searchParam, category
 * @return {object} returns ideas, pageInfo
 */
export const searchIdeas = (searchParam = '') => dispatch =>
  axios
    .get(`/api/v1/ideas/search?searchParam=${searchParam}`)
    .then((response) => {
      if (response.data.ideas.length === 0) {
        return Materialize.toast('Idea not found', 3000, 'red');
      }
      return dispatch(loadSearchIdeas(response.data.ideas));
    })
    .catch((error) => {
      throw error;
    });

/**
 * api call to get search by category
 * @param {object} offset, limit, searchParam, category
 * @return {object} returns ideas, pageInfo
 */
export const searchCategory = (category = '') => dispatch =>
  axios
    .get(`/api/v1/ideas/searchCategory?category=${category}`)
    .then((response) => {
      if (response.data.ideas.length === 0) {
        return Materialize.toast('Idea not found', 3000, 'red');
      }
      return dispatch(loadSearchIdeas(response.data.ideas));
    })
    .catch((error) => {
      throw error;
    });
/**
 * api call to get idea
 * @param {int} ideaId
 * @return {object} returns foundIdea
 */
export const getIdea = ideaId => dispatch =>
    axios
      .get(`/api/v1/idea/${ideaId}`)
      .then((response) => {
        dispatch(loadIdeaSuccess(response.data.foundIdea));
      }).catch((error) => {
        throw error;
      });

/**
 * api call to add comment
 * @param {object} ideaId, comment
 * @return {object} returns foundIdeas
 */
export const addComment = (ideaId, comment) => dispatch =>
  axios
    .post(`/api/v1/idea/${ideaId}/comment`, { comment })
    .then(() => {
      return dispatch(getIdea(ideaId));
    })
    .catch((error) => {
      throw error;
    });

/**
 * api call to edit Idea
 * @param {object} newIdea, ideaId
 * @return {object} returns foundIdeas
 */
export const editIdea = (newIdea, ideaId) => dispatch =>
  attachAuthToken(localStorage.getItem('token'))
    .put(`/api/v1/idea/${ideaId}`, newIdea)
    .then(() => {
      dispatch(getUserIdeas());
    })
    .catch((error) => {
      throw error;
    });
/**
 * api call to get delete idea
 * @param {object} newIdea
 * @return {object} returns foundIdeas
 */
export const deleteIdea = ideaId => dispatch =>
      axios
        .delete(`/api/v1/idea/${ideaId}`)
        .then(() => {
          dispatch(getUserIdeas());
        }).catch((error) => {
          throw error;
        });
