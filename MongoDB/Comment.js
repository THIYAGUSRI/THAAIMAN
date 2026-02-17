import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    id : {
        type: String,
        required: true
    },
    videoID: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    recommentID: {
        type: String
    },
    rating: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;