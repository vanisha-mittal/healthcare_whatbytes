import { Router } from "express";
import { body, param } from "express-validator";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";

import {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";

const router = Router();

router.use(auth);

const idRule = param("id").isInt({ min: 1 });

const createRules = [
  body("name").isString().trim().notEmpty(),
  body("specialization").isString().trim().notEmpty(),
  body("email").isEmail().normalizeEmail(),
  body("phone").isString().trim().notEmpty(),
];

const updateRules = [
  body("name").optional().isString().trim().notEmpty(),
  body("specialization").optional().isString().trim().notEmpty(),
  body("email").optional().isEmail().normalizeEmail(),
  body("phone").optional().isString().trim().notEmpty(),
];

router.post("/", createRules, validate, createDoctor);
router.get("/", getDoctors);
router.get("/:id", idRule, validate, getDoctor);
router.put("/:id", idRule, updateRules, validate, updateDoctor);
router.delete("/:id", idRule, validate, deleteDoctor);

export default router;