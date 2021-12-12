import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
