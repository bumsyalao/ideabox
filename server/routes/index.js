import Users from '../controllers/Users';
import Ideas from '../controllers/Ideas';
import auth from '../middleware/auth';

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.send('Welcome to Idea Box');
  });
  // api route to register user
  app.post('/api/v1/user/register', Users.register);
  // api route to login user
  app.post('/api/v1/user/login', Users.login);
  // api route to send reset password email
  app.post('/api/v1/user/forgot-password', Users.sendResetPassword);
  // api route to update password
  app.put('/api/v1/user/update-password/:hash', Users.updatePassword);
  // api route to create a new Idea
  app.post('/api/v1/idea', auth.checkToken, Ideas.create);
  // api route to get a users Ideas
  // app.get('/api/v1/ideas', auth.checkToken, Ideas.retrieveIdea);
};
