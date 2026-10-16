import { Router } from "express";
import { body, param } from "express-validator";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";

import {
  assignDoctor,
  getMappings,
  getPatientDoctors,
  removeMapping,
} from "../controllers/mappingController.js";

const router = Router();

router.use(auth);

router.post(
  "/",
  [
    body("patientId").isInt({ min: 1 }),
    body("doctorId").isInt({ min: 1 }),
  ],
  validate,
  (req, res, next) => {
    req.body.patientId = Number(req.body.patientId);
    req.body.doctorId = Number(req.body.doctorId);
    next();
  },
  assignDoctor
);

router.get("/", getMappings);

router.get(
  "/:patient_id",
  param("patient_id").isInt({ min: 1 }),
  validate,
  getPatientDoctors
);

router.delete(
  "/:id",
  param("id").isInt({ min: 1 }),
  validate,
  removeMapping
);

export default router;