import mongoose from 'mongoose';


const CommentSchema = new mongoose.Schema({
  comment: { type: String, required: true, unique: false, trim: true },
  authorId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'Required'
  },
  authorName:
  {
    type: mongoose.Schema.Types.String,
    ref: 'User'
  },
  ideaId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
  },
  createdAt: Date,
  updatedAt: Date
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
