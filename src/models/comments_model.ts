import mongoose from "mongoose";

export interface iComment {
  comment: String,
  postId: String,
  owner: String,
}

const commentsSchema = new mongoose.Schema<iComment>({
  comment: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

const commentsModel = mongoose.model<iComment>("comments", commentsSchema);

export default commentsModel;
