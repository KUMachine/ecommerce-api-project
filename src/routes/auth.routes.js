import { Router } from "express";
import userValidate from "../validations/user.validate.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authRouter = Router();

// login route
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  // if user found generate token
  if (user) {
    // generate token
    const token = jwt.sign(JSON.stringify(user), process.env.JWT_KEY);
    res.json({ token });
  } else {
    // if user not found return error
    res.status(400).json({ error: "invalid authentication data!" });
  }
});

// register route
authRouter.post("/register", async (req, res) => {
  // validate request body
  try {
    await userValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  // create new user
  const user = new User(req.body);
  await user.save();
  res.json({ message: "User Crated" });
});

export default authRouter;
