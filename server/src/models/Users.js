import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  // Schema is an object that defines the structure of my data
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

export const UserModel = mongoose.model("users", UserSchema); // Setting the schema to a collection, i.e. "users" here
