import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

export default User;
