const db = require("../db");
const express = require("express");
const ExpressError = require("../expressError");
const { default: slugify } = require("slugify");
const router = new express.Router();

//get all companies
router.get("/", async function (req, res, next) {
  try {
    const results = await db.query(`SELECT * FROM companies`);

    return res.json(results.rows);
  } catch (err) {
    return next(err);
  }
});

//get company by code
router.get("/:code", async function (req, res, next) {
  try {
    const results = await db.query(
      `SELECT * FROM companies WHERE code='${req.params.code}'`
    );

    //? this same bit of code is repeated several times, should it be a seperate function?
    if (results.rows.length == 0) {
      const err = new ExpressError("Not Found", 404);
      return next(err);
    }
    return res.json(results.rows);
  } catch (err) {
    return next(err);
  }
});

//post new company
router.post("/", async function (req, res, next) {
  try {
    const { name, description } = JSON.parse(req.body.company);

    let slug_code = slugify(name, { lower: true, strict: true });

    const result = await db.query(
      `INSERT INTO companies (code, name, description) 
             VALUES ($1, $2, $3)
             RETURNING code, name, description`,
      [slug_code, name, description]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

//edit company by code
router.patch("/:code", async function (req, res, next) {
  try {
    const { name, description } = JSON.parse(req.body.company);

    const result = await db.query(
      `UPDATE companies SET name=$1, description=$2
             WHERE code = $3
             RETURNING code, name, description`,
      [name, description, req.params.code]
    );

    if (result.rows.length == 0) {
      const err = new ExpressError("Not Found", 404);
      return next(err);
    }

    return res.json(result.rows[0]);
  } catch (err) {
    if (err instanceof SyntaxError) {
      const err = new ExpressError("Not Found", 404);
      return next(err);
    } else {
      return next(err);
    }
  }
});

//delete company by code
router.delete("/:code", async function (req, res, next) {
  try {
    const result = await db.query("DELETE FROM companies WHERE code = $1", [
      req.params.code,
    ]);
    if (result.rowCount == 0) {
      const err = new ExpressError("Not Found", 404);
      return next(err);
    }

    return res.json({ status: "deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
