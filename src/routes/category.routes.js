import { Router } from "express";
import categoryValidate from "../validations/category.validate.js";
import { isAdmin } from "../middlewares/auth.middleware.js";
import Category from "../models/category.model.js";

const categoryRouter = Router();

// create category
categoryRouter.post("/categories", isAdmin, async (req, res) => {
  // Validate request body
  try {
    await categoryValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  const category = new Category(req.body);
  await category.save();
  res.json({ message: "Category Crated" });
});

// get all categories
categoryRouter.get("/categories", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// get category by id
categoryRouter.get("/categories/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(404).json({ error: "Category not found" });
  }
});

// update category by id
categoryRouter.put("/categories/:id", isAdmin, async (req, res) => {
  // validate request body
  try {
    await categoryValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  // update category
  try {
    await Category.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Category Updated" });
  } catch (error) {
    res.status(404).json({ error: "Category not found" });
  }
});

// delete category by id
categoryRouter.delete("/categories/:id", isAdmin, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category Deleted" });
  } catch (error) {
    res.status(404).json({ error: "Category not found" });
  }
});

export default categoryRouter;
