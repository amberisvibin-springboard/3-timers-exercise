const express = require("express");
const router = new express.Router();
const db = require("./fakeDb");

//GET /items: get list of items
router.get("/", function(req, res) {
    return res.json({
        "status": "success",
        "data": db
    });
});

//POST /items: post to list of items
router.post("/:item", function(req, res) {
  return res.json({
      "status": "success",
      "data": {"added": db[req.params.item]}
  });
});

//GET /items:name: get item by name
router.get("/:name", function(req, res) {
  var result = db.find(item => {
    return item.name === req.params.name
  })
  if (result) {
    return res.json({
      "status": "success",
      "data": result
  });
  } else {
    return res.json({
      "status": "fail",
      "data": {"name": `${req.params.name} not found on server.`}
  });
  }
  
});

//PATCH /items:name: patch item by name
router.patch("/:name", function(req, res) {
  var result = db.find(item => {
    return item.name === req.params.name
  })
  if (result) {
    db[result].name = req.params.name
    db[result].price = req.params.price
    return res.json({
      "status": "success",
      "data": {"updated": result}
  });
  } else {
    return res.json({
      "status": "fail",
      "data": {"name": `${req.params.name} not found on server.`}
  });
  }
  
});

//DELEYE /items:name: delete item by name
router.delete("/:name", function(req, res) {
  var result = db.find(item => {
    return item.name === req.params.name
  })
  if (result) {
    db[result].remove()
    return res.json({
      "status": "success",
      "data": {"updated": result}
  });
  } else {
    return res.json({
      "status": "fail",
      "data": {"name": `${req.params.name} not found on server.`}
  });
  }
  
});

module.exports = router;
