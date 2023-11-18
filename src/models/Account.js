import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  uid: { type: "string", required: true },
  name: { type: "string", required: true },
  pin: { type: "string", required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
