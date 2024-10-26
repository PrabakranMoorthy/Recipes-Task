import express from "express";
import { createRecipe, deleteRecipe, getAllRecipes, getRecipeById, updateRecipe } from "../Controllers/recipeController.js";

const router = express.Router();

router.post("/create", createRecipe)
router.get("/getdata", getAllRecipes)
router.get("/getdata/:id", getRecipeById)
router.put("/update/:id", updateRecipe)
router.delete("/delete/:id",deleteRecipe)


export default router;
