import * as mongoose from 'mongoose';

const userType = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
};

export const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  user: userType,
});
