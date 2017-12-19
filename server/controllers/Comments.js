import Comment from '../models/Comment';
import Idea from '../models/Idea';
/**
 *
 *
 * @class Comment
 */
class Comments {
  /**
   * Add comment to an idea.
   * Route: POST: /api/v1/idea/:ideaId/comment
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberOf Comment
   */
  addComment(req, res) {
    if (!req.body.comment) {
      return res.status(400).send({
        success: false,
        error: 'Required Field',
        message: 'Please enter a comment'
      });
    }
    Idea.findOne({ _id: req.params.ideaId }).exec()
      .then((foundIdea) => {
        if (foundIdea.access === 'private') {
          return res.status(403).send({
            success: false,
            error: 'Forbidden',
            message: 'You can only comment on public Ideas'
          });
        }
        const commentDetails = {
          comment: req.body.comment,
          authorId: req.decoded.id,
          authorName: req.decoded.username,
          ideaId: foundIdea._id
        };
        const newComment = new Comment(commentDetails);
        foundIdea.comments.push(newComment);
        foundIdea.save();
        newComment.save((err) => {
          if (err) {
            return res.status(400).send({
              success: false,
              error: 'Database error',
              message: err.message
            });
          }
          return res.status(201).send({
            success: true,
            message: 'Your comment has been posted succesfully',
            newComment
          });
        });
      })
      .catch(err => res.status(500).send({
        success: false,
        error: 'Server Error',
        message: err.message
      }));
  }

  /**
   * Get comments for an idea
   * Route: GET: /api/v1/idea/:ideaId/comment
   * @param {any} req
   * @param {any} res
   *  @return {void}
   * @memberOf Comments
   */
  getComments(req, res) {
    Comment.find({ ideaId: req.params.ideaId }).exec()
      .then((ideaComment) => {
        if (!ideaComment.length) {
          return res.status(404).send({
            success: true,
            message: 'You have no comments'
          });
        }
        return res.status(200).send({
          success: true,
          ideaComment
        });
      }).catch(err => res.status(400).send({
        success: false,
        error: 'Database Error',
        message: err.message
      }));
  }

}

export default new Comments();
