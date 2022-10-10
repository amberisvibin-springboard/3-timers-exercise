const db = require("../db");
const express = require("express");
const ExpressError = require("../expressError");
const router = new express.Router();

router.get("/", async function (req, res, next) {
    try {
      const results = await db.query(
            `SELECT * FROM companies`);
  
      return res.json(results.rows);
    }
  
    catch (err) {
      return next(err);
    }
  });


router.get("/:code", async function (req, res, next) {
    try {
      const results = await db.query(
            `SELECT * FROM companies WHERE code='${req.params.code}'`);
    
      if (results.rows.length == 0) {
        const err = new ExpressError("Not Found", 404);
        return next(err);
      }
      return res.json(results.rows);
    }
  
    catch (err) {
      return next(err);
    }
  });


router.post("/", async function (req, res, next) {
    try {
      const { code , name , description } = JSON.parse(req.body.company);
  
      const result = await db.query(
            `INSERT INTO companies (code, name, description) 
             VALUES ($1, $2, $3)
             RETURNING code, name, description`,
          [code, name, description]
      );
  
      return res.status(201).json(result.rows[0]);
    }
  
    catch (err) {
      return next(err);
    }
  });

router.patch("/:code", async function (req, res, next) {
    try {
        const { name , description } = JSON.parse(req.body.company);
  
      const result = await db.query(
            `UPDATE companies SET name=$1, description=$2
             WHERE code = $3
             RETURNING code, name, description`,
          [name, description, req.params.code]
      );
      //console.log(result);

      if (result.rowCount == 0) {
        const err = new ExpressError("Not Found", 404);
        return next(err);
      }
  
      return res.json(result.rows[0]);
    }
  
    catch (err) {
      return next(err);
    }
  });

router.delete("/:code", async function (req, res, next) {
    try {
      const result = await db.query(
          "DELETE FROM companies WHERE code = $1",
          [req.params.code]
      );

      if (result.rowCount == 0) {
        const err = new ExpressError("Not Found", 404);
        return next(err);
      }
  
      return res.json({status: "deleted"});
    }
  
    catch (err) {
      return next(err);
    }
  });
  

  module.exports = router;