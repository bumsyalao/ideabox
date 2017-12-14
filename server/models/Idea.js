import mongoose from 'mongoose';

const { Schema } = mongoose.Schema;


const IdeaSchema = new mongoose.Schema({
  title: { type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true },
  authorId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  authorName:
  {
    type: mongoose.Schema.Types.String,
    ref: 'User'
  },
  description: { type: String, required: true, trim: true, lowercase: true },
  category: { type: String, required: true, lowercase: true },
  access: { type: String, required: true },
  modified: { type: Boolean, default: false },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: Date,
  updatedAt: Date,
});
IdeaSchema.index({ title: 'text', description: 'text' });
const Idea = mongoose.model('Idea', IdeaSchema);

export default Idea;
