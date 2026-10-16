import {
  Patient,
  Doctor,
  PatientDoctor,
} from "../models/index.js";

export async function assignDoctor(req, res, next) {
  try {
    const { patientId, doctorId } = req.body;

    if (!Number.isInteger(patientId) || !Number.isInteger(doctorId)) {
      return res.status(400).json({
        message: "patientId and doctorId must be integers",
      });
    }

    const patient = await Patient.findOne({
      where: { id: patientId, userId: req.user.id },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const doctor = await Doctor.findByPk(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const existing = await PatientDoctor.findOne({
      where: { patientId, doctorId },
    });

    if (existing) {
      return res.status(409).json({
        message: "Doctor already assigned to this patient",
      });
    }

    const mapping = await PatientDoctor.create({
      patientId,
      doctorId,
    });

    res.status(201).json({
      message: "Doctor assigned successfully",
      mapping,
    });
  } catch (err) {
    next(err);
  }
}

export async function getMappings(req, res, next) {
  try {
    const mappings = await PatientDoctor.findAll({
      include: [
        {
          model: Patient,
          as: "patient",
          where: { userId: req.user.id },
          attributes: ["id", "name", "age", "gender"],
        },
        {
          model: Doctor,
          as: "doctor",
          attributes: ["id", "name", "specialization", "email", "phone"],
        },
      ],
    });

    res.json(mappings);
  } catch (err) {
    next(err);
  }
}

export async function getPatientDoctors(req, res, next) {
  try {
    const patient = await Patient.findOne({
      where: {
        id: req.params.patient_id,
        userId: req.user.id,
      },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const mappings = await PatientDoctor.findAll({
      where: { patientId: patient.id },
      include: [
        {
          model: Doctor,
          as: "doctor",
          attributes: ["id", "name", "specialization", "email", "phone"],
        },
      ],
    });

    res.json(mappings);
  } catch (err) {
    next(err);
  }
}

export async function removeMapping(req, res, next) {
  try {
    const mappingId = Number(req.params.id);

    // Find the mapping
    const mapping = await PatientDoctor.findByPk(mappingId);

    if (!mapping) {
      return res.status(404).json({
        message: "Patient-doctor mapping not found",
      });
    }

    const patient = await Patient.findOne({
      where: {
        id: mapping.patientId,
        userId: req.user.id,
      },
    });

    if (!patient) {
      return res.status(404).json({
        message: "Mapping not found",
      });
    }

    await mapping.destroy();

    return res.status(200).json({
      message: "Doctor removed from patient successfully",
    });
  } catch (err) {
    console.error("Error removing mapping:", err);
    return next(err);
  }
}