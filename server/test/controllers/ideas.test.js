import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import mongoose from 'mongoose';
import Ideas from '../../controllers/Ideas';
import Users from '../../controllers/Users';
import app from '../../app';
import {
  dummyUser,
  editIdea,
  deleteIdea,
  validIdea,
  valid2Idea,
  invalidIdea } from '../helper';

require('dotenv').config();

const api = supertest.agent(app);
const { expect } = chai;

chai.should();
chai.use(chaiHttp);
let validToken;
let ideaId;

before((done) => {
  mongoose.createConnection(process.env.DATABASE_URL_TEST, () => {
    mongoose.connection.db.dropDatabase(() => {
    });
  });
  api
    .post('/api/v1/user/register', Users.register)
    .set('Accept', 'application/json')
    .send(dummyUser)
    .end((err, res) => {
      if (!err) {
        validToken = res.body.token;
        api
        .post('/api/v1/idea', Ideas.createIdea)
        .set('x-access-token', validToken)
        .send(valid2Idea)
        .end((err, res) => {
          if (!err) {
            ideaId = res.body.newIdea._id;
          }
        });
      }
      done();
    });
});

describe('Ideas', () => {
  describe('Create Idea', () => {
    it('should return 201 when succesful', (done) => {
      api
        .post('/api/v1/idea', Ideas.createIdea)
        .set('x-access-token', validToken)
        .send(validIdea)
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(201);
            res.body.should.have.property('message')
              .equal('Your Idea has been created successfully');
          }
          done();
        });
    });
    it('should return 409 if title supplied already exist', (done) => {
      api
        .post('/api/v1/idea', Ideas.createIdea)
        .set('x-access-token', validToken)
        .send(validIdea)
        .end((err, res) => {
          if (res) {
            expect(res).to.have.status(409);
            res.body.should.have.property('message')
              .equal('Title must be unique');
          }
          done();
        });
    });
    it('should return 400 if a required field is not sent', (done) => {
      api
        .post('/api/v1/idea', Ideas.createIdea)
        .set('x-access-token', validToken)
        .send(invalidIdea)
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(400);
            res.body.should.have.property('message')
              .equal('All fields are required');
          }
          done();
        });
    });
  });
  describe('Retrive Users Idea', () => {
    it('should return 200 when succesful', (done) => {
      api
        .get('/api/v1/idea', Ideas.retrieveUserIdeas)
        .set('x-access-token', validToken)
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(200);
            res.body.should.have.property('message')
              .equal('Found Ideas');
          }
          done();
        });
    });
    it('should return 401 when no user token', (done) => {
      api
        .get('/api/v1/idea', Ideas.retrieveUserIdeas)
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(401);
            res.body.should.have.property('message')
              .equal('User not authorized');
          }
          done();
        });
    });
  });
  describe('Retrieve all public Ideas', () => {
    it('should return 200 when successful', (done) => {
      api
        .get('/api/v1/ideas', Ideas.retrieveIdeas)
        .set('x-access-token', validToken)
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(200);
            res.body.should.have.property('message')
              .equal('Found Ideas');
          }
          done();
        });
    });
  });
  describe('Edit Idea', () => {
    it('should return 200 when succesful', (done) => {
      api
        .put(`/api/v1/idea/${ideaId}`, Ideas.editIdea)
        .set('x-access-token', validToken)
        .send(editIdea)
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(200);
            res.body.should.have.property('message')
              .equal('Your Idea has been updated succesfully');
          }
          done();
        });
    });
    it('should return 400 if all required fields are not sent', (done) => {
      api
        .put(`/api/v1/idea/${ideaId}`, Ideas.editIdea)
        .set('x-access-token', validToken)
        .send()
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(400);
            res.body.should.have.property('message')
              .equal('All fields are required');
          }
          done();
        });
    });
    it('should return 404 when no user token', (done) => {
      api
        .put('/api/v1/idea', Ideas.editIdea)
        .send(editIdea)
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(404);
          }
          done();
        });
    });
  });
  describe('Delete Idea', () => {
    it('should return 200 when succesful', (done) => {
      api
        .delete(`/api/v1/idea/${ideaId}`, Ideas.deleteIdea)
        .set('x-access-token', validToken)
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(200);
          }
          done();
        });
    });
    it('should return 404 when no idea is found', (done) => {
      api
        .delete('/api/v1/idea', Ideas.deleteIdea)
        .set('x-access-token', validToken)
        .send(deleteIdea)
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(404);
          }
          done();
        });
    });
  });
});
