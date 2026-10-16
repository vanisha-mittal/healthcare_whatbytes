import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { notEmpty: true },
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

export const Patient = sequelize.define("Patient", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 0, max: 150 },
  },
  gender: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export const Doctor = sequelize.define("Doctor", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

export const PatientDoctor = sequelize.define(
  "PatientDoctor",
  {},
  {
    indexes: [
      {
        unique: true,
        fields: ["patientId", "doctorId"],
      },
    ],
  }
);

// One user owns many patients.
User.hasMany(Patient, {
  as: "patients",
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});
Patient.belongsTo(User, {
  as: "owner",
  foreignKey: "userId",
});

// Patients and doctors have a many-to-many relationship.
Patient.belongsToMany(Doctor, {
  through: PatientDoctor,
  as: "doctors",
  foreignKey: "patientId",
  otherKey: "doctorId",
  onDelete: "CASCADE",
});
Doctor.belongsToMany(Patient, {
  through: PatientDoctor,
  as: "patients",
  foreignKey: "doctorId",
  otherKey: "patientId",
  onDelete: "CASCADE",
});

PatientDoctor.belongsTo(Patient, {
  as: "patient",
  foreignKey: "patientId",
});
PatientDoctor.belongsTo(Doctor, {
  as: "doctor",
  foreignKey: "doctorId",
});

export default sequelize;