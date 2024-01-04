//import express from "express";
//import userData from "../src/data/users.json" assert { type: "json" };
//import jwt from "jsonwebtoken";

// const router = express.Router();

// router.post("/", (req, res) => {
//   const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
//   const { username, password } = req.body;
//   const { users } = userData;
//   const user = users.find(
//     (u) => u.username === username && u.password === password
//   );

//   if (!user) {
//     return res.status(401).json({ message: "Invavlid credentials!" });
//   }

//   const token = jwt.sign({ userId: user.id }, secretKey);
//   res.status(200).json({ message: "Successfully logged in!", token });
// });

import express from "express";
import login from "../src/services/auth/login.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await login(username, password);

    if (!token) {
      res.status(401).json({ message: "Invalid credentials! " });
    } else {
      res.status(200).json({ message: "Successfully logged in!", token });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
