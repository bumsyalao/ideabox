import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import faker from 'faker';
import mongoose from 'mongoose';
import Ideas from '../../controllers/Ideas';
import app from '../../app';
import { validIdea, invalidIdea } from '../helper';

require('dotenv').config();

const api = supertest.agent(app);
const { expect } = chai;

chai.should();
chai.use(chaiHttp);

before((done) => {
  mongoose.createConnection(process.env.DATABASE_URL_TEST, () => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
});

describe('Ideas', () => {
  describe('Create', () => {
    it('should return 201 when succesful', (done) => {
      api
        .post('api/v1/idea', Ideas.create)
        .set('Accept', 'application/json')
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
        .post('api/v1/idea', Ideas.create)
        .set('Accept', 'application/json')
        .send(validIdea)
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(409);
            res.body.should.have.property('message')
              .equal('Title must be unique');
          }
          done();
        });
    });
    it('should return 400 if a required field is not sent', (done) => {
      api
        .post('api/v1/idea', Ideas.create)
        .set('Accept', 'application/json')
        .send(invalidIdea)
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(400);
            res.body.should.have.property('message')
              .equal('All fields are required');
          }
          done();
        });
    });
  });
});
