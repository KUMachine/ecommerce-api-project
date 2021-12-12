import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  description: String,
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
