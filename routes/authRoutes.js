import { Router } from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/authController.js";
import validate from "../middleware/validate.js";

const router = Router();

router.post(
  "/register",
  [
    body("name").isString().trim().notEmpty(),
    body("email").isEmail().normalizeEmail(),
    body("password").isString().isLength({ min: 8 }),
  ],
  validate,
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isString().notEmpty(),
  ],
  validate,
  login
);

export default router;