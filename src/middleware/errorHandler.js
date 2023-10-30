const logger = require("../utils/logger");
const Messages = require("../utils/messages");

// General error handling middleware
const errorHandler = (error, req, res, next) => {
  switch (error.name) {
    default:
      logger.error(error.message, {
        metadata: error,
        stack: error.stack,
        name: error.name,
      });
      return res.status(500).json({ message: Messages.serverError });
  }
};

module.exports = errorHandler;
