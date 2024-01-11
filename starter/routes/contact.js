import express from "express";

const router = express.Router();

//POST = Create Contact
router.post("/", async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    const newContact = await createContactEntry(name, email, message);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

export default router;
