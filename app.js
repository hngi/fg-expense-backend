//const createError = require("http-errors");
const express = require("express");
// const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const favicon = require("serve-favicon");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// Require file system module
// const fs = require("file-system");
const cors = require("cors");
const webRoutes = require("./routes/web");
const commentRoutes = require("./routes/comments");

const app = express();

//connect to mongodb
mongoose
  .connect(
    "mongodb+srv://fg-expense-tracker:backend@fg-expense-tracker-c1uom.mongodb.net/fg-expense-tracker?retryWrites=true&w=majority",
    {
      useNewUrlParser: true, // for connection warning
      useUnifiedTopology: true,
    },
    () => {
      console.log(
        "\n \t Database connection has been established successfully"
      );
    }
  )
  .catch((err) => {
    console.error("App starting error:", err.stack);
    process.exit(1);
  });

// setup middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "public"));
app.use(cors());

//setup app routes
app.get("/docs", docs);
app.use("/", webRoutes);
app.use("/comments", commentRoutes);

//set temporary base url
function docs(req, res) {
  res.status(301).sendFile(__dirname + "/views/index.html");
}

/*
    |||  I'll use route method to handle request and response circle  |||
*/
// catch 404 and forward to error handler
/* app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
  res.send("error");
}); */

module.exports = app;
