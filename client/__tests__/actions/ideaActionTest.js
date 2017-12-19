import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actionType from '../../actions/types';
import localStorageMock from '../../__mocks__/localStorageMock';
import { newIdea, foundIdeas, myFoundIdeas, offset, limit, searchParam, category, foundSearchIdeas, metaData, ideaId, foundIdea, getComment } from '../../__mocks__/helper';
import {
  getPublicIdeas,
  getUserIdeas,
  createIdea,
  searchIdeas,
  getIdea,
  addComment,
  editIdea,
  deleteIdea
} from '../../actions/ideaAction';

window.localStorage = localStorageMock;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Idea Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Create Idea', () => {
    it('Should make AJAX call to create Idea', (done) => {
      moxios.stubRequest('/api/v1/idea', {
        status: 200,
        response: {
          newIdea
        }
      });
      const store = mockStore({});
      const expectedAction = [];
      store.dispatch(createIdea(newIdea)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });

  describe('getPublicIdeas', () => {
    it('should make AJAX call to get public ideas', (done) => {
      moxios.stubRequest('/api/v1/ideas', {
        status: 200,
        response: {
          foundIdeas
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.LIST_PUBLIC_IDEAS,
        foundIdeas
      }];
      store.dispatch(getPublicIdeas()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });

  describe('get user ideas', () => {
    it('should make AJAX call to get user\'s ideas', (done) => {
      moxios.stubRequest('/api/v1/idea', {
        status: 200,
        response: {
          myFoundIdeas
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.LIST_USER_IDEAS,
        myFoundIdeas
      }];
      store.dispatch(getUserIdeas()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });

  describe('Search Idea', () => {
    it('shouls make AJAX call to search Idea', (done) => {
      moxios.stubRequest(`/api/v1/ideas/search?limit=${limit}&offset=${offset}&searchParam=${searchParam}&category=${category}`, {
        status: 200,
        response: {
          foundSearchIdeas,
          metaData
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.LIST_FOUND_IDEAS,
        foundSearchIdeas,
        metaData
      }];
      store.dispatch(searchIdeas({
        offset, limit, searchParam, category
      })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });

  describe('get idea', () => {
    it('should make AJAX call to get idea', (done) => {
      moxios.stubRequest(`/api/v1/idea/${ideaId}`, {
        status: 200,
        response: {
          foundIdea
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.GET_IDEA,
        foundIdea
      }];
      store.dispatch(getIdea(ideaId)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });

  describe('add comment', () => {
    it('should make an AJAX call to add comment', (done) => {
      moxios.stubRequest(`/api/v1/idea/${ideaId}/comment`, {
        status: 200,
        response: {
          getComment
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        getComment,
        type: actionType.GET_IDEA
      }];
      store.dispatch(addComment(ideaId)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });

  describe('edit Idea', () => {
    it('should make AJAX call to edit idea', (done) => {
      moxios.stubRequest(`/api/v1/idea/${ideaId}`, {
        status: 200,
        response: {
          newIdea
        }
      });
      const store = mockStore({});
      const expectedAction = [];
      store.dispatch(editIdea(newIdea)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });

  describe('delete idea', () => {
    it('should make AJAX call to delete idea', (done) => {
      moxios.stubRequest(`/api/v1/idea/${ideaId}`, {
        status: 200,
        response: {
          newIdea
        }
      });
      const store = mockStore({});
      const expectedAction = [];
      store.dispatch(deleteIdea(newIdea)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });
});
