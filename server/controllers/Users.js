import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

require('dotenv').config();

const secret = process.env.SECRET_TOKEN;
/**
 *
 *
 * @class Users
 */
class Users {
  /**
   *
   * Route: POST: /api/v1/user/register
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @memberOf Users
   */
  register(req, res) {
    if (
      req.body.username &&
      req.body.username.trim() &&
      req.body.password &&
      req.body.password.length > 7 &&
      req.body.email &&
      validator.isEmail(req.body.email)
    ) {
      User.findOne({
        email: req.body.email
      }).exec((err, existingUser) => {
        if (existingUser) {
          return res.status(400).send({
            success: false,
            error: 'existingUser',
            message: 'A user already exists with that email'
          });
        }

        const newUser = new User(req.body);
        newUser.save((err) => {
          if (err) {
            return res.status(400).send({
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
          return res.status(200).send({
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
   *
   * Route: POST: /api/v1/user/login
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberOf Users
   */
  login(req, res) {
    if (req.body.username && req.body.password) {
      User.findOne({ username: req.body.username })
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
              return res.status(400).send({
                success: false,
                error: 'invalid',
                message: 'User not found'
              });
            });
          } else {
            return res.status(400).send({
              success: false,
              error: 'invalid',
              message: 'User not found'
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
   * Send Reset password email
   * Routes: POST: /api/v1/user/forgot-password
   * @param {object} req
   * @param {object} res
   * @returns {response} response object
   */
  // sendResetPassword(req, res) {
  //   const email = req.body.email;
  //   const salt = bcrypt.genSaltSync(8);
  //   const hash = bcrypt.hashSync(email, salt);
  //   const date = new Date();

  //   date.setHours(date.getHours() + 1);

  //   if (email === undefined || email.trim() === ' ') {
  //     res.status(400).send({
  //       data: { error: { message: 'email is not valid' } }
  //     });
  //     return;
  //   }
  //   User.findOne({
  //     email
  //   }).then((user) => {
  //     if (user === null) {
  //       res.status(404).send({ message: 'User does not exist' });
  //     } else {
  //       user
  //         .update({
  //           hash,
  //           expiryTime: date
  //         })
  //         .then((updatedUser) => {
  //           // send email here
  //           sendMail(updatedUser.email, hash, req.headers.host);
  //           res.status(200).send({
  //             updatedUser
  //           });
  //         })
  //         .catch((error) => {
  //           res.status(500).send({
  //             data: { error: { message: error } }
  //           });
  //         });
  //     }
  //   });
  // }
}

export default new Users();
