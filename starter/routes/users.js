import express from "express";
import getUsers from "../src/services/users/getUsers.js";
import createUser from "../src/services/users/createUser.js";
import deleteUser from "../src/services/users/deleteUserById.js";
import getUserById from "../src/services/users/getUserById.js";
import updateUserById from "../src/services/users/updateUserById.js";
import authMiddleware from "../src/middleware/auth.js";

const router = express.Router();

//Get All Users
router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

//POST = Create New User
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { username, password, name, image } = req.body;
    const newUser = await createUser(username, password, name, image);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

//DELETE User By Id
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUserId = await deleteUser(id);

    if (!deletedUserId) {
      res.status(404).send(`User with id ${id} was not found!`);
    } else {
      res
        .status(200)
        .json({ message: `User with id ${deletedUserId} was deleted!` });
    }
  } catch (error) {
    next(error);
  }
});

//GET User by Id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
      res
        .status(404)
        .send({ message: `User with id ${id} was not found!`, user });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

// PUT = Update User by ID
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    //add username and password here
    const { username, password, name, image } = req.body;
    //sending all the user data as 1 object with all the data "{}"
    const user = await updateUserById(id, { username, password, name, image });

    if (!user) {
      res.status(404).send({ message: `User with id ${id} was not found!` });
    } else {
      res
        .status(200)
        .send({ message: ` User with id ${id} successfully updated!`, user });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
