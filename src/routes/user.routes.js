import { Router } from "express";
import User from "../models/user.model.js";
import userValidate from "../validations/user.validate.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/users", isAdmin, async (req, res) => {
  try {
    await userValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  const user = new User(req.body);
  await user.save();
  res.json({ message: "User Crated" });
});

userRouter.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

userRouter.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

userRouter.put("/users/:id", async (req, res) => {
  try {
    await userValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "User Updated" });
});

export default userRouter;
