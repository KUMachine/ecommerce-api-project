import { Router } from "express";
import User from "../models/user.model.js";
import userValidate from "../validations/user.validate.js";

const userRouter = Router();

userRouter.get("/users", (req, res) => {
  res.send("hello user");
});

userRouter.post("/users", async (req, res) => {
  try {
    await userValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  const user = new User(req.body);
  await user.save();
  res.json({ message: "User Crated" });
});

export default userRouter;
