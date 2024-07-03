import express from "express";
import getImgAnimationById from "../src/services/animation/getImgAnimation.js";
import getImgAnimation from "../src/services/animation/getImgAnimationAll.js";

const router = express.Router();

//Fetch All
router.get("/", async (req, res, next) => {
  try {
    const animation = await getImgAnimation();
    res.status(200).json(animation);
  } catch (error) {
    next(error);
  }
});

//GET imgAnimation by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const animation = await getImgAnimationById(id);

    if (!animation) {
      res.status(404).send({
        message: `Image Animation with id ${id} was not found`,
        animation,
      });
    } else {
      res.status(200).json(animation);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
