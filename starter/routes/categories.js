import express from "express";
import getCategories from "../src/services/categories/getCategories.js";
import createCategory from "../src/services/categories/createCategory.js";
import deleteCategory from "../src/services/categories/deleteCategoryById.js";
import getCategoryById from "../src/services/categories/getCategoryById.js";
import updateCategoryById from "../src/services/categories/updateCategoryById.js";
import authMiddleware from "../src/middleware/auth.js";

const router = express.Router();

//fetch all categories
router.get("/", async (req, res, next) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

//POST Create Category
router.post(
  "/",
  //  authMiddleware,
  async (req, res, next) => {
    try {
      const { name } = req.body;
      const newCategory = await createCategory(name);

      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

//DELETE Category by Id
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteCategoryId = await deleteCategory(id);

    if (!deleteCategoryId) {
      res.status(404).send(`Category with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `Category with id ${id} was deleted`,
        deleteCategoryId,
      });
    }
  } catch (error) {
    next(error);
  }
});

//GET Category By Id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);

    if (!category) {
      res.status(404).send(`Category with id ${id} was not found!`);
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    next(error);
  }
});

//PUT Update Category By Id
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await updateCategoryById(id, { name });

    if (updatedCategory) {
      res.status(200).json({
        message: `Category with id ${updatedCategory} successfully updated!`,
      });
    } else {
      res.status(404).json({ message: `Category with id ${id} not found!` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
