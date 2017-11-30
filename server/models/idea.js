import mongoose from 'mongoose';

const { Schema } = mongoose.Schema;


const IdeaSchema = new Schema({
  title: { type: String, required: true, unique: false },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  description: { type: String, required: true },
  categories: { type: String, required: true },
  access: { type: String, required: true },
  modified: { type: Boolean, default: false },
  createdAt: Date,
  updatedAt: Date
});

const Idea = mongoose.model('Idea', IdeaSchema);

export default Idea;
