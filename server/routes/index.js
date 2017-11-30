import Users from '../controllers/Users';

module.exports = (app) => {
  app.get('/api/v1/user/register', (req, res) => {
    res.send('i am signed up');
  });
  // api route to register user
  app.post('/api/v1/user/register', Users.register);
  // api route to login user
  app.post('/api/v1/user/login', Users.login);
  // api route to send reset password email
  app.post('/api/v1/user/forgot-password', Users.sendResetPassword);

  // api route to update password
  app.put('/api/v1/user/update-password/:hash', Users.updatePassword);
};
