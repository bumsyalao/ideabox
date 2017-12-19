import Idea from '../models/Idea';
import pagination from '../middleware/pagination';

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
  createIdea(req, res) {
    if (
      req.body.title.trim() &&
      req.body.category &&
      req.body.access
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
          authorName: req.decoded.username,
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
            newIdea
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

  /**
   * Get a users Ideas
   * Routes: GET: /api/v1/idea
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberOf Ideas
   */
  retrieveUserIdeas(req, res) {
    Idea.find({ authorId: req.decoded.id }).exec()
      .then((foundIdeas) => {
        return res.status(200).send({
          success: true,
          message: 'Found Ideas',
          foundIdeas
        });
      }).catch(() => res.status(401).send({
        success: false,
        error: 'invalid user',
        message: 'User not authorized'
      }));
  }
    /**
   * Get a Idea
   * Routes: GET: /api/v1/idea/:ideaId
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberOf Ideas
   */
  retrieveIdea(req, res) {
    Idea.findOne({ _id: req.params.ideaId })
    .populate('comments')
    .exec()
      .then(foundIdea => res.status(200).send({
        success: true,
        message: 'Found Idea',
        foundIdea
      }))

      .catch(() => res.status(401).send({
        success: false,
        error: 'invalid Idea',
        message: 'Invalid Idea Id'
      }));
  }

  /**
   * Get all Ideas
   * Routes: GET: /api/v1/ideas
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberOf Ideas
   */
  retrieveIdeas(req, res) {
    Idea.find({ access: 'public' }).exec()
      .then((foundIdeas) => {
        return res.status(200).send({
          success: true,
          message: 'Found Ideas',
          foundIdeas
        });
      }).catch(() => res.status(500).send({
        success: false,
        error: 'server error',
        message: 'There was a server error, try again later'
      }));
  }
  /**
   * Edit a Idea
   * Route: PUT: /api/v1/idea/:ideaId
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberOf Idea
   */
  editIdea(req, res) {
    const id = req.decoded.id;
    Idea.findOne({ _id: req.params.ideaId }).exec()
      .then((foundIdea) => {
        if (
          id == foundIdea.authorId &&
          req.body.title &&
          req.body.description &&
          req.body.category &&
          req.body.access
        ) {
          foundIdea.title = req.body.title;
          foundIdea.description = req.body.description;
          foundIdea.category = req.body.category;
          foundIdea.access = req.body.access;
          foundIdea.modified = true;
          foundIdea.authorName = req.decoded.username;
          foundIdea.save((err) => {
            if (err) {
              return res.status(400).send({
                success: false,
                error: err.message,
                message: 'There was an error while updating your Idea'
              });
            }
            return res.status(200).send({
              success: true,
              message: 'Your Idea has been updated succesfully',
              foundIdea
            });
          });
        } else {
          return res.status(400).send({
            success: false,
            error: 'Empty fields',
            message: 'All fields are required'
          });
        }
      }).catch(err => res.status(400).send({
        success: false,
        error: 'Database Error',
        message: err.message
      }));
  }

  /**
   * Delete Idea
   * Routes: DELETE: /api/v1/idea/:ideaId
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberOf IdeaController
   */
  deleteIdea(req, res) {
    const id = req.decoded.id;
    Idea.findOne({ _id: req.params.ideaId }).exec()
      .then((foundIdea) => {
        if (id != foundIdea.authorId) {
          return res.status(403).send({
            success: false,
            error: 'Forbidden',
            message: 'You are not allowed to delete an Idea you did not create'
          });
        }
        Idea.findByIdAndRemove({ _id: req.params.ideaId }, (err) => {
          if (err) {
            return res.status(500).send({
              success: false,
              error: 'server error',
              message: 'There was a server error, please try again later'
            });
          }
          return res.status(200).send({
            success: true,
            message: 'Your Idea has been deleted succesfully'
          });
        });
      })
      .catch(error => res.status(400).send({
        success: false,
        error: error.messae,
        message: 'Bad Request'
      }));
  }

  /**
   * Search Ideas
   * Route: GET: /api/v1/ideas?limit=${limit}&offset=${offset}
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberOf Ideas
   */
  searchIdeas(req, res) {
    const offset = Number(req.query.offset);
    const limit = Number(req.query.limit);
    let count;
    Idea.count({
      $text: { $search: req.query.searchParam.toLowerCase() },
      category: req.query.category.toLowerCase(),
      access: 'public'
    }, (err, iscount) => {
      count = iscount;
      const promise = Idea.find({
        $text: { $search: req.query.searchParam.toLowerCase() },
        category: req.query.category.toLowerCase()
      })
      .skip(offset)
      .limit(limit).exec();
      promise.then(ideas => res.status(200).send({
        ideas,
        pageInfo: pagination(count, limit, offset),
      }));
    });
  }
}

export default new Ideas();
