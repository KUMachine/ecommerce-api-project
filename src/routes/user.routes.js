import { Router } from "express";
import User from "../models/user.model.js";
import userValidate from "../validations/user.validate.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const userRouter = Router();

// create user
userRouter.post("/users", isAdmin, async (req, res) => {
  // Validate request body
  try {
    await userValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  const user = new User(req.body);
  await user.save();
  res.json({ message: "User Crated" });
});

// get all users
userRouter.get("/users", isAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// get user by id
userRouter.get("/users/:id", isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
});

// update user by id
userRouter.put("/users/:id", isAdmin, async (req, res) => {
  // validate request body
  try {
    await userValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  // update user
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "User Updated" });
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
});

// delete user by id
userRouter.delete("/users/:id", isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted" });
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
});

export default userRouter;
