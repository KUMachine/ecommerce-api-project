import { Router } from "express";
import User from "../models/user.model.js";

const userRouter = Router();

userRouter.get("/users", (req, res) => {
  res.send("hello user");
});

userRouter.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: "User Crated" });
});

export default userRouter;
