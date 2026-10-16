import { Router } from "express";
import { body, param } from "express-validator";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";

import {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";

const router = Router();

router.use(auth);

const idRule = param("id").isInt({ min: 1 });

const createRules = [
  body("name").isString().trim().notEmpty(),
  body("age").isInt({ min: 0, max: 150 }),
  body("gender").isIn(["Male", "Female", "Other"]),
  body("address").isString().trim().notEmpty(),
];

const updateRules = [
  body("name").optional().isString().trim().notEmpty(),
  body("age").optional().isInt({ min: 0, max: 150 }),
  body("gender").optional().isIn(["Male", "Female", "Other"]),
  body("address").optional().isString().trim().notEmpty(),
];

router.post("/", createRules, validate, createPatient);
router.get("/", getPatients);
router.get("/:id", idRule, validate, getPatient);
router.put("/:id", idRule, updateRules, validate, updatePatient);
router.delete("/:id", idRule, validate, deletePatient);

export default router;