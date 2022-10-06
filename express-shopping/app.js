const express = require('express');
const itemRoutes = require("./routes");

const app = express();

//handle internal server errors
const jsonErrorHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({
        "status": "error",
        "message": `internal server error: ${err.message}.`,
        "code": 500
    });
}

app.use("/items", itemRoutes);

app.use(jsonErrorHandler)

//handle 404
app.use(function (req, res, next) {
    res.status(404).send({
        "status": "error",
        "message": `not found.`,
        "code": 404
    })
})
  
module.exports = app;