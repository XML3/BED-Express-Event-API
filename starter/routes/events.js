import express from "express";
import getEvents from "../src/services/events/getEvents.js";
import createEvent from "../src/services/events/createEvent.js";
import deleteEvent from "../src/services/events/deleteEventById.js";
import getEventById from "../src/services/events/getEventById.js";
import updateEventById from "../src/services/events/updateEventById.js";
import authMiddleware from "../src/middleware/auth.js";
import uploadMiddleware from "../src/middleware/uploadMiddleware.js";
// import uploadFileToImgBB from "../src/utils/fileUpload.js";

const router = express.Router();

//fetch All Events
router.get("/", async (req, res, next) => {
  try {
    const { title, location } = req.query;
    const events = await getEvents(title, location);
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
});

//POST = Create New Event + upload file(img) middleware
router.post(
  "/",
  // authMiddleware,
  // uploadMiddleware.single("image"),
  async (req, res, next) => {
    try {
      const {
        title,
        image,
        description,
        location,
        startTime,
        endTime,
        createdBy,
        categoryIds,
        lineup,
      } = req.body;

      //********
      //This section is removed, but commented out for reference.  This is to avoid users from overloading my hosting site

      // const imageFile = req.file;
      // const imageUrl = imageFile
      //   ? await uploadFileToImgBB(imageFile.path)
      //   : null;

      const newEvent = await createEvent({
        title,
        image,
        description,
        location,
        startTime,
        endTime,
        createdBy,
        categoryIds,
        lineup,
      });

      res.status(201).json(newEvent);
    } catch (error) {
      next(error);
    }
  }
);

//DELETE Event By Id
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteEventById = await deleteEvent(id);

    if (!deleteEventById) {
      res.status(404).send(`Event with id ${id} was not found!`);
    } else {
      res
        .status(200)
        .json({ message: `Record with id ${deleteEventById} was deleted` });
    }
  } catch (error) {
    next(error);
  }
});

//Get Event By Id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await getEventById(id);

    if (!event) {
      res.status(404).send(`Event with id ${id} was not found!`);
    } else {
      res.status(200).json(event);
    }
  } catch (error) {
    next(error);
  }
});

//PUT = Update Event by Id + upload file(img) Middleware
router.put(
  "/:id",
  authMiddleware,
  // uploadMiddleware.single("image"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        location,
        image,
        startTime,
        endTime,
        createdBy,
        categoryIds,
        lineup,
      } = req.body;
      // const image = req.file;

      const updatedEvent = await updateEventById(id, {
        title,
        description,
        location,
        image,
        startTime,
        endTime,
        createdBy,
        categoryIds,
        lineup,
      });

      if (updatedEvent) {
        res.status(200).send({
          message: `Event with id ${id} succesfully updated`,
          updatedEvent,
        });
      } else {
        res.status(404).json({ message: `Event with id ${id} not found` });
      }
    } catch (error) {
      next(error);
    }
  }
);

export default router;
