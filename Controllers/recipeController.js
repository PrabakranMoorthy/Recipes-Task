import recipes from "../Models/recipeSchema.js";

/*const recipes = [
  {
    id: 1,
    name: "Chocolate Brownie",
    procedure:
      "In a large bowl, cream the flour, cocoa powder, and brown sugar. Add the eggs one at a time",
    ingredients: [
      "Flour",
      "Cocoa Powder",
      "Brown Sugar",
      "Eggs",
      "Cocoa Butter",
      "Vanilla Extract",
    ],
    duration: "20 min",
  },
  {
    id: 2,
    name: "Briyani",
    procedure:
      "Heat a wok or griddle over medium heat. Add chicken, onions, garlic, ginger, and tomatoes",
    ingredients: [
      "Chicken",
      "Onions",
      "Garlic",
      "Ginger",
      "Tomatoes",
      "Cumin",
      "Turmeric",
      "Cinnamon",
      "Coriander",
    ],
    duration: "45 min",
  },
  {
    id: 3,
    name: "Pizza",
    procedure:
      "Preheat oven to 450°F (230°C). In a large bowl, mix together flour, water",
    ingredients: [
      "Flour",
      "Water",
      "Salt",
      "Pepper",
      "Yeast",
      "Cheese (e.g., mozzarella)",
    ],
    duration: "40 min",
  },
  {
    id: 4,
    name: "Macaroni and Cheese",
    procedure:
      "Heat a large skillet over medium heat. Cook the pasta according to package instructions",
    ingredients: [
      "Macaroni",
      "Cheese",
      "Garlic",
      "Onions",
      "Tomatoes",
      "Olive Oil",
      "Basil",
    ],
    duration: "30 min",
  },
];
*/
//create / post method

export const createRecipe = async (req, res) => {
  try {
    const recipe = new recipes(req.body);
    await recipe.save();
    res
      .status(200)
      .json({ message: "Recipes Added Successfully", data: recipe });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Internal server Error in create Recipes",
        data: error,
      });
  }
};

// get method

export const getAllRecipes = async (req, res) => {
  try {
    const getRecipe = await recipes.find();
    res
      .status(200)
      .json({ message: "Recipes retrieved successfully", data: getRecipe });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Internal server Error in getall Recipes",
        data: error,
      });
  }
};

// get by id method

export const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await recipes.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res
      .status(200)
      .json({ message: "Recipe retrieved successfully", data: recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update method

export const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { name, procedure, ingredients, duration } = req.body;
    const result = await recipes.findByIdAndUpdate(
      { _id: recipeId },
      { name, procedure, ingredients, duration },
      { new: true }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    //const recipe=await recipes.findById(productid)
    res
      .status(200)
      .json({ message: "Recipe updated successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete method

export const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const result = await recipes.findByIdAndDelete({ _id: recipeId });
    if (!result) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    const recipe = await recipes.find();
    res.status(200).json({ message: "Recipe deleted", data:recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}