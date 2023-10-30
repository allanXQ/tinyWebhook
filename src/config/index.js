const DBConn = require("./dbConn");

const allowedOrigins = [
  "138.68.143.186",
  "tinypesa.com",
  "www.tinypesa.com",
  "https://tinypesa.com",
  "https://www.tinypesa.com",
];

module.exports = {
  DBConn,
  allowedOrigins,
};
