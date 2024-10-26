import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/dbConfig.js";
import recipeRouter from "./Routers/recipeRouter.js";
//dotenv
dotenv.config();

// Initialize Express app
const app = express();

//middleware
app.use(express.json());

//cors
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.status(200).send("welcome to Our API");
});

//router
app.use("/api/recipes", recipeRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server started and running on the port");
});
