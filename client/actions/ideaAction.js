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

export const loadFoundIdeas = ({ foundIdeas, metaData }) => ({
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


export const getIdeas = (offset = 0, limit = 20, searchParam = '', category = '') => dispatch =>
  axios
    .get(`/api/v1/ideas?limit=${limit}$offset=${offset}`, searchParam, category)
    .then((response) => {
      if (!response.data.ideas.length > 0) {
        Materialize.toast(
          'Sorry, we could not find what you are looking for',
          5000,
          'red'
        );
      }
      dispatch(loadFoundIdeas(response.data));
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
