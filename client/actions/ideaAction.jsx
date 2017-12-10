import axios from 'axios';
import attachAuthToken from '../utils/attachAuthToken';
import { LIST_PUBLIC_IDEAS } from './types';

export const loadIdeas = foundIdeas => ({
  type: LIST_PUBLIC_IDEAS,
  foundIdeas
});

export const getPublicIdeas = () => dispatch =>
      axios
        .get('/api/v1/ideas')
        .then((response) => {
          console.log('===> response.data', response.data);
          dispatch(loadIdeas(response.data.foundIdeas));
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
