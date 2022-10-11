/** BizTime express application. */

const express = require("express");

const app = express();
const ExpressError = require("./expressError");

//required to parse json to js object
const bodyParser = require("body-parser");

//route includes
const companiesRoutes = require("./routes/companies");
const invoicesRoutes = require("./routes/invoices");

app.use(express.json());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

//use routes
app.use("/companies", companiesRoutes);
app.use("/invoices", invoicesRoutes);

//404 handler
app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

//general error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message,
  });
});

module.exports = app;
