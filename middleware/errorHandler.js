export default function errorHandler(err, req, res, next) {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      message: "A record with this value already exists",
    });
  }

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: "Database validation failed",
      errors: err.errors.map((e) => e.message),
    });
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      message: "Invalid related record",
    });
  }

  res.status(500).json({
    message: "Internal server error",
  });
}