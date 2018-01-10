import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import mongoose from 'mongoose';
import Users from '../../controllers/Users';
import app from '../../app';
import {
  validUser,
  existingEmail,
  invalidEmail,
  noPassword,
  invalidPassword,
  validSignin,
  dummy2User,
  invalidUpdate,
  updatedUser
} from '../helper';

require('dotenv').config();

const api = supertest.agent(app);
const { expect } = chai;

chai.should();
chai.use(chaiHttp);
let validToken;
let hash;

before((done) => {
  mongoose.createConnection(process.env.DATABASE_URL_TEST, () => {
    mongoose.connection.db.dropDatabase(() => {
    });
  });
  api
    .post('/api/v1/user/register', Users.register)
    .set('Accept', 'application/json')
    .send(dummy2User)
    .end((err, res) => {
      if (!err) {
        validToken = res.body.token;
      }
      done();
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
            validToken = res.body.token;
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
  });

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
    });
  });

  describe('update profile', () => {
    it('Should return 200 if profile update is successful', (done) => {
      const username = 'Javascript';
      const email = 'javascript@jvc.com';
      chai.request(app)
        .put('/api/v1/user/update', Users.updateProfile)
        .set('Accept', 'application/json')
        .set('x-access-token', validToken)
        .send({ username, email })
        .end((err, res) => {
          if (res) {
            res.status.should.equal(200);
            res.body.should.have.property('message')
              .equal('Your profile has been updated succesfully');
          }
          done();
        });
    });
    it('Should return 409 if new username is already in use', (done) => {
      const username = 'Javascript';
      const email = 'javascript@jvc.com';
      chai.request(app)
        .put('/api/v1/user/update', Users.updateProfile)
        .set('Accept', 'application/json')
        .set('x-access-token', validToken)
        .send({ username, email })
        .end((err, res) => {
          if (res) {
            res.status.should.equal(409);
            res.body.should.have.property('message')
              .equal('Sorry a user exists with that username');
          }
          done();
        });
    });
    it('should return 401 for an unauthorized attempt', (done) => {
      api
        .put('/api/v1/user/update', Users.updateProfile)
        .end((err, res) => {
          if (res) {
            expect(res).to.have.status(401);
          }
          done();
        });
    });
  });
  describe('send Reset Password', () => {
    it('should return 404 if email address does not exit', (done) => {
      const email = 'monkey4u@bannana.com';
      chai.request(app)
        .post('/api/v1/user/forgot-password', Users.sendResetPassword)
        .send({ email })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(404);
            res.body.should.have.property('message')
              .equal('User does not exist');
          }
          done();
        });
    });
    it('should return 200 whan reset mail has been sent', (done) => {
      const email = 'javascript@jvc.com';
      chai.request(app)
        .post('/api/v1/user/forgot-password', Users.sendResetPassword)
        .send({ email })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(200);
            res.body.should.have.property('message')
              .equal('Mail has been sent');
            hash = res.body.hash;
          }
          done();
        });
    });
  }); // End of Reset Password

  describe('Update Password', () => {
    it('should return 400 if new Password is empty', (done) => {
      const password = '';
      chai.request(app)
        .put(`/api/v1/user/update-password/${hash}`, Users.updatePassword)
        .set('Accept', 'application/json')
        .send({ password })
        .end((err, res) => {
          if (res) {
            res.status.should.equal(400);
            res.body.should.have.property('message')
              .equal('Please enter valid password');
          }
          done();
        });
    });

    it('should return 201 when new password has been updated', (done) => {
      const password = '12443asd';
      chai.request(app)
        .put(`/api/v1/user/update-password/${hash}`, Users.updatePassword)
        .set('Accept', 'application/json')
        .send({ password })
        .end((err, res) => {
          if (res) {
            res.status.should.equal(201);
            res.body.should.have.property('message')
              .equal('Password has been updated');
          }
          done();
        });
    });
  });
});

