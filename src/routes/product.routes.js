import { Router } from "express";
import Product from "../models/product.model.js";
import productValidate from "../validations/product.validate.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const productRouter = Router();

// create product
productRouter.post("/products", isAdmin, async (req, res) => {
  // Validate request body
  try {
    await productValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  const product = new Product(req.body);
  await product.save();
  res.json({ message: "Product Crated" });
});

// get all products
productRouter.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// get product by id
productRouter.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
});

// update product by id
productRouter.put("/products/:id", isAdmin, async (req, res) => {
  // validate request body
  try {
    await productValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  // update product
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Product Updated" });
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
});

// delete product by id
productRouter.delete("/products/:id", isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product Deleted" });
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
});

export default productRouter;
