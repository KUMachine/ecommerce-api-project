import express from "express";
import userRouter from "./src/routes/user.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import productRouter from "./src/routes/product.routes.js";
import categoryRouter from "./src/routes/category.routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

async function main() {
  // setup .env variables
  dotenv.config("dotenv");

  await mongoose.connect(process.env.MONGO_URL);
  const app = express();

  //use cors
  app.use(cors());

  // parse the body
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // setup routes
  app.use(userRouter);
  app.use(authRouter);
  app.use(productRouter);
  app.use(categoryRouter);

  app.listen(process.env.PORT, () => {
    console.log("listening on http://localhost:" + process.env.PORT);
  });
}

main();
