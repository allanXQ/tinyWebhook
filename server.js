require("module-alias/register");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { errorHandler } = require("@middleware");
const { DBConn, allowedOrigins } = require("@config");

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/tinypesa/", require("@routes"));

app.use(errorHandler);

DBConn(app, port);
