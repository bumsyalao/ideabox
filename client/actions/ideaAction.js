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

export const loadSearchIdeas = (foundIdeas, metaData) => ({
  type: LIST_FOUND_IDEAS,
  foundIdeas,
  metaData
});

export const loadIdeaSuccess = foundIdea => ({
  type: GET_IDEA,
  foundIdea
});

export const getPublicIdeas = () => dispatch =>
  axios
    .get('/api/v1/ideas')
    .then((response) => {
      dispatch(loadIdeas(response.data.foundIdeas));
    })
    .catch((error) => {
      throw error;
    });

export const getUserIdeas = () => dispatch =>
  axios
    .get('/api/v1/idea')
    .then((response) => {
      dispatch(loadUserIdeas(response.data.foundIdeas));
    })
    .catch((error) => {
      throw error;
    });

export const createIdea = newIdea => dispatch =>
  attachAuthToken(localStorage.getItem('token'))
    .post('/api/v1/idea', newIdea)
    .then(() => {
      dispatch(getPublicIdeas());
    })
    .catch((error) => {
      throw error;
    });


export const searchIdeas = (offset = 0, limit = 9, searchParam = '', category = '') => dispatch =>
  axios
    .get(`/api/v1/ideas/search?limit=${limit}&offset=${offset}&searchParam=${searchParam}&category=${category}`)
    .then((response) => {
      return dispatch(loadSearchIdeas(response.data.ideas, response.data.pageInfo));
    })
    .catch((error) => {
      throw error;
    });

export const getIdea = ideaId => dispatch =>
    axios
      .get(`/api/v1/idea/${ideaId}`)
      .then((response) => {
        dispatch(loadIdeaSuccess(response.data.foundIdea));
      }).catch((error) => {
        throw error;
      });


export const addComment = (ideaId, comment) => dispatch =>
  axios
    .post(`/api/v1/idea/${ideaId}/comment`, { comment })
    .then(() => {
      return dispatch(getIdea(ideaId));
    })
    .catch((error) => {
      throw error;
    });


export const editIdea = (newIdea, ideaId) => dispatch =>
  attachAuthToken(localStorage.getItem('token'))
    .put(`/api/v1/idea/${ideaId}`, newIdea)
    .then(() => {
      dispatch(getUserIdeas());
    })
    .catch((error) => {
      throw error;
    });

export const deleteIdea = ideaId => dispatch =>
      axios
        .delete(`/api/v1/idea/${ideaId}`)
        .then(() => {
          dispatch(getUserIdeas());
        }).catch((error) => {
          throw error;
        });
