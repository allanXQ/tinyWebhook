require("module-alias/register");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { errorHandler } = require("@middleware");
const { DBConn, allowedOrigins } = require("@config");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 5005;

app.use(helmet());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/tinypesa/", require("@routes"));

app.use(errorHandler);

const pingInterval = 840000; // 14 minutes in milliseconds

function pingSelf() {
  axios
    .get("https://tinywebhook.onrender.com/api/v1/user/user-info")
    .then((response) => {
      console.log("Service pinged successfully:", response.status);
    })
    .catch((error) => {
      console.error("Error pinging service:", error);
    });
}

setInterval(pingSelf, pingInterval);

DBConn(app, port);
