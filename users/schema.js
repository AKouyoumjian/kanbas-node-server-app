import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    _id: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    role: {
      type: String,
      default: "USER",
      enum: ["ADMIN", "FACULTY", "STUDENT", "USER"],
    },
    dob: Date,
    doh: { type: Date, default: Date.now },
  },
  { collection: "users" }
);
export default userSchema;
