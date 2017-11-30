import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import faker from 'faker';
import mongoose from 'mongoose';
import Users from '../../controllers/Users';
import app from '../../app';
import {
  validUser,
  existingEmail,
  invalidEmail,
  noPassword,
  invalidPassword,
  validSignin } from '../helper';

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

describe('Users', () => {
  describe('Register', () => {
    it('should return 201 when successful ', (done) => {
      api
        .post('/api/v1/user/register', Users.register)
        .set('Accept', 'application/json')
        .send(validUser)
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(201);
            res.body.should.have.property('message')
              .equal('Your account has been created');
          }
          done();
        });
    });
    it('should return 409 if email supplied already exist', (done) => {
      api
        .post('/api/v1/user/register', Users.register)
        .send(existingEmail)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            expect(res).to.have.status(409);
            res.body.should.have.property('message')
              .equal('A user already exists with that email');
            done();
          }
        });
    });
    it('should return 400 if an invalid email is sent', (done) => {
      api
        .post('/api/v1/user/register', Users.register)
        .send(invalidEmail)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(400);
            res.body.should.have.property('message')
              .equal('Invalid Credentials');
          }
          done();
        });
    });
    it('should return 400 if password supplied is empty', (done) => {
      api
        .post('/api/v1/user/register', Users.register)
        .send(noPassword)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(400);
            res.body.should.have.property('message')
              .equal('Invalid Credentials');
          }
          done();
        });
    });
  }); // End of SignUp Test Suite

  describe('Login', () => {
    it('should return 200 on successful login', (done) => {
      api
        .post('/api/v1/user/login', Users.login)
        .send(validSignin)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(200);
            res.body.should.have.property('message')
              .equal('You have logged in succesfully');
          }
          done();
        });
    });
    it('should return 404 if username supplied does not exist', (done) => {
      api
        .post('/api/v1/user/login', Users.login)
        .send(invalidPassword)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(404);
            res.body.should.have.property('message')
              .equal('User not found');
          }
          done();
        });
    });
    it('should return 400 if no email or password is supplied', (done) => {
      api
        .post('/api/v1/user/login', Users.login)
        .send({})
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(400);
            res.body.should.have.property('message')
              .equal('Incomplete login details');
          }
          done();
        });
    }); // End of SignIn
  });
});
