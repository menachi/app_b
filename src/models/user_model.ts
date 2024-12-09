import mongoose from "mongoose";

export interface iUser {
  email: string,
  password: string,
  _id?: string,
}

const userSchema = new mongoose.Schema<iUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model<iUser>("users", userSchema);

export default userModel;