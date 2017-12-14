import Users from '../controllers/Users';
import Ideas from '../controllers/Ideas';
import Comments from '../controllers/Comments';
import auth from '../middleware/auth';

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.send('Welcome to Idea Box');
  });
  // api route to register user
  app.post('/api/v1/user/register', Users.register);
  // api route to login user
  app.post('/api/v1/user/login', Users.login);
  // api route to view a user
  app.get('/api/v1/user/profile', Users.viewUser);
  // api route to update users profile
  app.put('/api/v1/user/update/:hash', auth.checkToken, Users.updateProfile);
  // api route to send reset password email
  app.post('/api/v1/user/forgot-password', Users.sendResetPassword);
  // api route to update password
  app.put('/api/v1/user/update-password/:hash', Users.updatePassword);
  // api route to create a new Idea
  app.post('/api/v1/idea', auth.checkToken, Ideas.createIdea);
  // api route to get a idea
  app.get('/api/v1/idea/:ideaId', auth.checkToken, Ideas.retrieveIdea);
  // api route to get a users Ideas
  app.get('/api/v1/idea', auth.checkToken, Ideas.retrieveUserIdeas);
  // api route to get all public ideas
  app.get('/api/v1/ideas', Ideas.retrieveIdeas);
  // api route to update an Idea
  app.put('/api/v1/idea/:ideaId', auth.checkToken, Ideas.editIdea);
  // api route to delete an Idea
  app.delete('/api/v1/idea/:ideaId', auth.checkToken, Ideas.deleteIdea);
  // api route to search for Ideas
  app.get('/api/v1/ideas/search', auth.checkToken, Ideas.searchIdeas);
  // api to add a comment to an Idea
  app.post('/api/v1/idea/:ideaId/comment', auth.checkToken, Comments.addComment);
  // api to add a comment to an Idea
  app.get('/api/v1/idea/:ideaId/comment', auth.checkToken, Comments.getComments);
};
