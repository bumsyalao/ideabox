import validator from 'validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import sendMail from '../middleware/sendMail';

require('dotenv').config();

const secret = process.env.SECRET_TOKEN;
/**
 *
 *
 * @class Users
 */
class Users {
  /**
   * Register User
   * Route: POST: /api/v1/user/register
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @memberOf Users
   */
  register(req, res) {
    if (
      req.body.username.trim() &&
      req.body.password &&
      req.body.email &&
      validator.isEmail(req.body.email)
    ) {
      User.findOne({
        email: req.body.email
      }).exec((err, existingUser) => {
        if (existingUser) {
          return res.status(409).send({
            success: false,
            error: 'existingUser',
            message: 'A user already exists with that email'
          });
        }

        const newUser = new User(req.body);
        newUser.save((err) => {
          if (err) {
            return res.status(409).send({
              success: false,
              message: 'A user already exists with that username'
            });
          }
          // create token
          const token = jwt.sign(
            {
              username: newUser.username,
              email: newUser.email,
              id: newUser._id
            },
            secret
          );
          const userDetails = {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
          };
          // return user
          return res.status(201).send({
            success: true,
            message: 'Your account has been created',
            userDetails,
            token
          });
        });
      });
    } else {
      return res.status(400).send({
        success: false,
        error: 'invalid',
        message: 'Invalid Credentials'
      });
    }
  }

  /**
   * Login User
   * Route: POST: /api/v1/user/login
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberOf Users
   */
  login(req, res) {
    if (req.body.username && req.body.password) {
      User.findOne({ username: req.body.username }).exec()
        .then((foundUser) => {
          if (foundUser) {
            foundUser.comparePassword(req.body.password, (err, isMatch) => {
              if (isMatch) {
                const token = jwt.sign(
                  {
                    username: foundUser.username,
                    email: foundUser.email,
                    id: foundUser._id
                  },
                  secret
                );
                const userDetails = {
                  username: foundUser.username,
                  email: foundUser.email,
                  id: foundUser._id
                };
                return res.status(200).send({
                  success: true,
                  message: 'You have logged in succesfully',
                  userDetails,
                  token
                });
              }
              return res.status(404).send({
                success: false,
                error: 'invalid',
                message: 'User not found'
              });
            });
          } else {
            return res.status(404).send({
              success: false,
              error: 'invalid',
              message: 'Invalid username or password'
            });
          }
        })
        .catch(err =>
          res.status(400).send({
            success: false,
            error: 'invalid',
            message: err.message
          }));
    } else {
      return res.status(400).send({
        success: false,
        message: 'Incomplete login details'
      });
    }
  }
  /**
   * Update user profile
   * Route: PUT: /api/v1/user/update
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @memberOf Users
   */
  updateProfile = (req, res) => {
    if (!req.body.username || !req.body.email) {
      return res.status(400).send({
        success: false,
        message: 'All fields are required'
      });
    }
    User.findOne({
      username: req.body.username.trim(),
    })
      .exec()
      .then((username) => {
        if (username) {
          res.status(409).send({
            message: 'Sorry a user exists with that username',
            success: false
          });
        } else {
          const newUsername = req.body.username.trim();
          const newEmail = req.body.email.trim();
          User.findByIdAndUpdate(
            { _id: req.decoded.id },
            {
              $set: {
                username: newUsername,
                email: newEmail,
              },
            },
            { new: true },
          )
            .exec((error, user) => {
              if (user) {
                const foundUser = {
                  id: user._id,
                  username: user.username,
                  email: user.email
                };
                return res.status(200).send({
                  success: true,
                  message: 'Your profile has been updated succesfully',
                  foundUser
                });
              }
              return res.status(404).send({ success: false, message: 'User not Found' });
            })
            .catch(error =>
              res.status(500).send({ error }));
        }
      });
  };
  /**
   * Send Reset password email
   * Routes: POST: /api/v1/user/forgot-password
   * @param {object} req
   * @param {object} res
   * @returns {response} response object
   */
  sendResetPassword(req, res) {
    req.body.email = req.body.email.trim();
    const hash = crypto.randomBytes(20).toString('hex');
    const date = Date.now() + 3600000;
    if (req.body.email) {
      return User.findOne({
        email: req.body.email
      }).then((user) => {
        if (user === null) {
          return res.status(404).send({
            success: false,
            message: 'User does not exist'
          });
        }
        user.hash = hash;
        user.expiryTime = date;
        user.save((error, updatedUser) => {
          if (error) {
            return res.status(400).send({
              success: false,
              message: error
            });
          }

          // send mail to the user
          sendMail(updatedUser.email, hash, req.headers.host);

          res.status(200).send({
            success: true,
            message: 'Mail has been sent',
            hash
          });
        });
      }).catch(error => res.status(500).send({
        message: error.message
      }));
    }
    return res.status(400).send({
      success: false,
      message: 'No email sent'
    });
  }

  /**
   * Update Password
   * Route: PUT: /api/v1/user/update-password/:hash
   * @param {object} req
   * @param {object} res
   *  @return {void}
   */
  updatePassword(req, res) {
    return User.findOne({ hash: req.params.hash })
      .then((user) => {
        if (
          req.body.password !== ''
        ) {
          const currentTime = Date.now();
          if (currentTime > user.expiryTime) {
            return res.status(410).send({
              success: false,
              message: 'Expired link'
            });
          }
          user.password = req.body.password;
          user.save((err, updatedUser) => {
            if (err) {
              return res.status(400).send({
                success: false,
                message: err.message
              });
            }

            res.status(201).send({
              success: true,
              message: 'Password has been updated',
              updatedUser
            });
          });
        } else {
          return res.status(400).send({
            success: false,
            message: 'Please enter valid password'
          });
        }
      })
      .catch(error => res.status(500).send({
        success: false,
        message: error.message
      }));
  }

  /**
   * View a User
   * Route: GET: /api/v1/user/profile
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberOf Users
   */
  viewUser(req, res) {
    User.findOne({ username: req.decoded.username }).exec()
    .then(foundUser => res.status(200).send({
      success: true,
      message: 'found User',
      foundUser
    })).catch(() => res.status(401).send({
      success: false,
      error: 'invalid user',
      message: 'User not authorized'
    }));
  }
}

export default new Users();
