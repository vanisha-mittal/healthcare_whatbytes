import { Patient } from "../models/index.js";

export async function createPatient(req, res, next) {
  try {
    const { name, age, gender, address } = req.body;

    const patient = await Patient.create({
      name,
      age,
      gender,
      address,
      userId: req.user.id,
    });

    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
}

export async function getPatients(req, res, next) {
  try {
    const patients = await Patient.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json(patients);
  } catch (err) {
    next(err);
  }
}

export async function getPatient(req, res, next) {
  try {
    const patient = await Patient.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (err) {
    next(err);
  }
}

export async function updatePatient(req, res, next) {
  try {
    const patient = await Patient.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const fields = ["name", "age", "gender", "address"];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => fields.includes(key))
    );

    await patient.update(updates);
    res.json(patient);
  } catch (err) {
    next(err);
  }
}

export async function deletePatient(req, res, next) {
  try {
    const patient = await Patient.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await patient.destroy();

    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    next(err);
  }
}