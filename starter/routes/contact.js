import express from "express";
import createContactEntry from "../src/services/contact/contact.js";
import verifyRecaptcha from "../src/utils/verifyRecaptcha.js";

const router = express.Router();

//POST = Create Contact
router.post("/", async (req, res, next) => {
  try {
    const { name, email, message, recaptchaToken } = req.body;

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return res.status(400).json({ error: "Invalid reCAPTCHA token" });
    }

    const newContact = await createContactEntry(name, email, message);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

export default router;
