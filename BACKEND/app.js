const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

//route imports
const routes = require("./routes/index.js");
app.use("/", routes);

// Middleware for errors
app.use(errorMiddleware);

module.exports = app;
