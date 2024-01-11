import express from "express";
import getArticles from "../src/services/articles/getArticles";

const router = express.Router();

//Fetch ALL Articles
router.get("/", async (req, res, next) => {
  try {
    const articles = await getArticles();
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
});

export default router;
