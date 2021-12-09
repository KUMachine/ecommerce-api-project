import express from "express";
import userRouter from "./src/routes/user.routes.js";
import mongoose from "mongoose";

async function main() {
  await mongoose.connect("mongodb://localhost:27017/commerce_database");
  const app = express();

  // parse the body
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // setup routes
  app.use(userRouter);

  app.listen(5000, () => {
    console.log("listening on http://localhost:5000");
  });
}

main();
