import mongoose from 'mongoose';

const { Schema } = mongoose.Schema;


const IdeaSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  authorId:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  description: { type: String, required: true },
  category: { type: String, required: true },
  access: { type: String, required: true },
  modified: { type: Boolean, default: false },
  createdAt: Date,
  updatedAt: Date
});

const Idea = mongoose.model('Idea', IdeaSchema);

export default Idea;
