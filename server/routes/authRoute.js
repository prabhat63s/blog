import express from "express";

import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  deleteUserController,
  getAllUsersController,
  loginController,
  registerController,
} from "../controller/authController.js";

//router object
const router = express.Router();

//REGISTER
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

//all users
router.get("/all-users", getAllUsersController);

//delete user
router.delete("/delete-user/:userId", deleteUserController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
