/** @format */

const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {
  logger.error("Error:", err);

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON in request body" });
  }
  res.status(500).json({ error: "Internal server error" });
};

module.exports = errorHandler;
