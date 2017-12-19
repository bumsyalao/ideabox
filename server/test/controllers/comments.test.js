import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import mongoose from 'mongoose';
import Ideas from '../../controllers/Ideas';
import Users from '../../controllers/Users';
import Comments from '../controllers/comments.test';
import app from '../../app';
import {
  dumUser,
  valid2Idea,
  myComment,
  nullComment } from '../helper';

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
    .send(dumUser)
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

xdescribe('Comments', () => {
  describe('Add comment', () => {
    it('should return 200 when succesful', () => {
      api
        .post(`/api/v1/idea/${ideaId}/comment`, Comments.addComment)
        .set('x-access-token', validToken)
        .send(myComment)
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(201);
            res.body.should.have.property('message')
              .equal('Your comment has been posted succesfully');
          }
        });
    });
    it('should return 400 when comment is not supplied', () => {
      api
        .post(`/api/v1/idea/${ideaId}/comment`, Comments.addComment)
        .set('x-access-token', validToken)
        .send(nullComment)
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(400);
            res.body.should.have.property('message')
              .equal('Please enter a comment');
          }
        });
    });
  });
});
