import mongoose from 'mongoose';

const { Schema } = mongoose.Schema;


const CommentSchema = new Schema({
  comment: { type: String, required: true, unique: false },
  aurthur: { type: String, required: true },
  createdAt: Date,
  updatedAt: Date
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
