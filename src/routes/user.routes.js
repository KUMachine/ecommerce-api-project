import { Router } from "express";

const userRouter = Router();

userRouter.get("/users", (req, res) => {
  res.send("hello user");
});

export default userRouter;
