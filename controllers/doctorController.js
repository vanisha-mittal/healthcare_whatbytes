import { Doctor } from "../models/index.js";

export async function createDoctor(req, res, next) {
  try {
    const { name, specialization, email, phone } = req.body;

    const doctor = await Doctor.create({
      name,
      specialization,
      email: email.toLowerCase(),
      phone,
    });

    res.status(201).json(doctor);
  } catch (err) {
    next(err);
  }
}

export async function getDoctors(req, res, next) {
  try {
    const doctors = await Doctor.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(doctors);
  } catch (err) {
    next(err);
  }
}

export async function getDoctor(req, res, next) {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (err) {
    next(err);
  }
}

export async function updateDoctor(req, res, next) {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const fields = ["name", "specialization", "email", "phone"];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => fields.includes(key))
    );

    if (updates.email) {
      updates.email = updates.email.toLowerCase();
    }

    await doctor.update(updates);
    res.json(doctor);
  } catch (err) {
    next(err);
  }
}

export async function deleteDoctor(req, res, next) {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await doctor.destroy();

    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    next(err);
  }
}