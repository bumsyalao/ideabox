import mongoose from 'mongoose';

const { Schema } = mongoose.Schema;


const CommentSchema = new Schema({
  comment: { type: String, required: true, unique: false, trim: true },
  aurthur: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  createdAt: Date,
  updatedAt: Date
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
