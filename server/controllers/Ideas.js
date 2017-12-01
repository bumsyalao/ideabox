import validator from 'validator';
import Idea from '../models/Idea';

/**
 *
 *
 * @class Idea
 */
class Ideas {
  /**
   * Create a new Idea
   * Route: POST: /api/v1/idea
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberOf Idea
   */
  create(req, res) {
    if (
      req.body.title.trim() &&
      !(validator.isEmpty(req.body.title)) &&
      req.body.description.trim() &&
      !(validator.isEmpty(req.body.description)) &&
      req.body.category.trim() &&
      !(validator.isEmpty(req.body.category)) &&
      req.body.access.trim() &&
      !(validator.isEmpty(req.body.access))
    ) {
      Idea.findOne({ title: req.body.title }).exec((err, existingTitle) => {
        if (existingTitle) {
          return res.status(409).send({
            success: false,
            error: 'existingTitle',
            message: 'Title must be unique'
          });
        }
        const ideaDetails = {
          title: req.body.title,
          description: req.body.description,
          authorId: req.decoded.id,
          category: req.body.category,
          access: req.body.access
        };
        const newIdea = new Idea(ideaDetails);
        newIdea.save((err) => {
          if (err) {
            return res.status(400).send({
              success: false,
              error: 'InvalidEntry',
              message: 'There was a server error, Try again later'
            });
          }
          // return new Idea
          return res.status(201).send({
            success: true,
            message: 'Your Idea has been created successfully',
            ideaDetails
          });
        });
      });
    } else {
      return res.status(400).send({
        success: false,
        error: 'Invalid request',
        message: 'All fields are required'
      });
    }
  }

  // /**
  //  * Get a users Ideas
  //  * Routes: GET: /api/v1/idea/:userid
  //  * @param {any} req
  //  * @param {any} res
  //  * @return {void}
  //  * @memberOf Ideas
  //  */
  // retrieveIdea(req, res) {
  //   // const userId = req.decoded._id;
  //   Idea.find({ authorId: req.decoded._id }).exec()
  //     .then((foundIdea) => {
  //       console.log('found idea', foundIdea);
  //     });
  // }
}

export default new Ideas();
