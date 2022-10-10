const db = require("../db");
const express = require("express");
const ExpressError = require("../expressError");
const router = new express.Router();

router.get("/", async function (req, res, next) {
    try {
      const results = await db.query(
            `SELECT * FROM invoices`);
  
      return res.json(results.rows);
    }
  
    catch (err) {
      return next(err);
    }
  });

router.get("/:id", async function (req, res, next) {
    try {
      const results = await db.query(
            `SELECT * FROM invoices WHERE id='${req.params.id}'`);
    
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
      const { comp_code , amt} = JSON.parse(req.body.invoice);
  
      const result = await db.query(
            `INSERT INTO invoices (comp_code, amt) 
             VALUES ($1, $2)
             RETURNING *`,
          [comp_code, amt]
      );
  
      return res.status(201).json(result.rows[0]);
    }
  
    catch (err) {
      return next(err);
    }
  });

router.patch("/:id", async function (req, res, next) {
    try {
        const { amt } = JSON.parse(req.body.invoice);
  
        const result = await db.query(
                `UPDATE invoices SET amt=$1
                WHERE id = $2
                RETURNING *`,
            [amt, req.params.id]
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

router.delete("/:id", async function (req, res, next) {
    try {
      const result = await db.query(
          "DELETE FROM invoices WHERE id = $1",
          [req.params.id]
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