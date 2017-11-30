import Users from '../controllers/Users';

module.exports = (app) => {
  app.get('/api/v1/user/register', (req, res) => {
    res.send('i am signed up');
  });
  app.post('/api/v1/user/register', Users.register);
  app.post('/api/v1/user/login', Users.login);
};
