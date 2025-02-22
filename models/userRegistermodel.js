import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  referralCode: { type: String, unique: true },
});

export default mongoose.model("User", userSchema);
