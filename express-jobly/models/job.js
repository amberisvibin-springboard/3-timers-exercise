"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs. */

class Job {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { id, title, salary, equity }
   *
   * Returns { id, title, salary, equity }
   *
   * Throws BadRequestError if job already in database.
   * */

  static async create({ id, title, salary, equity }) {
    const duplicateCheck = await db.query(
      `SELECT title
           FROM jobs
           WHERE title = $1`,
      [title]
    );

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate job: ${title}`);

    const result = await db.query(
      `INSERT INTO jobs
           (id, title, salary, equity)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id, title, salary, equity"`,
      [id, title, salary, equity]
    );
    const job = result.rows[0];

    return job;
  }

  /** Find all jobs.
   *
   * Returns [{ id, title, salary, equity }, ...]
   * */

  static async findAll() {
    const jobsRes = await db.query(
      `SELECT id, title, salary, equity
           FROM jobs
           ORDER BY title`
    );
    return jobsRes.rows;
  }

  // /** Find filtered jobs.
  //  *
  //  * Returns [{ id, title, salary, equity }, ...]
  //  * */

  // static async findFiltered(title, minEmployees, maxEmployees) {
  //   //TODO: there has got to be a better way to do this
  //   let whereStatement = "";
  //   if (title != null) {
  //     if (whereStatement == "") {
  //       whereStatement = (`WHERE title=$1 `, [title]);
  //     } else {
  //       whereStatement += (`AND title=$1 `, [title]);
  //     }
  //   }
  //   if (minEmployees != null) {
  //     if (whereStatement == "") {
  //       whereStatement = (`WHERE minEmployees=$1 `, [minEmployees]);
  //     } else {
  //       whereStatement += (`AND minEmployees=$1 `, [minEmployees]);
  //     }
  //   }
  //   if (maxEmployees != null) {
  //     if (whereStatement == "") {
  //       whereStatement = (`WHERE maxEmployees=$1 `, [maxEmployees]);
  //     } else {
  //       whereStatement += (`AND maxEmployees=$1 `, [maxEmployees]);
  //     }
  //   }
  //   const jobsRes = await db.query(
  //     `SELECT title,
  //                 title,
  //                 description,
  //                 num_employees AS "numEmployees",
  //                 logo_url AS "logoUrl"
  //          FROM jobs
  //          $1
  //          ORDER BY title`,
  //     [whereStatement]
  //   );
  //   return jobsRes.rows;
  // }

  /** Given a job title, return data about job.
   *
   * Returns { id, title, salary, equity, jobs }
   *   where jobs is [{ id, title, salary, equity, jobtitle }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(title) {
    const jobRes = await db.query(
      `SELECT id, title, salary, equity
           FROM jobs
           WHERE title = $1`,
      [title]
    );

    const job = jobRes.rows[0];

    if (!job) throw new NotFoundError(`No job: ${title}`);

    return job;
  }

  /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {title, description, numEmployees, logoUrl}
   *
   * Returns {id, title, salary, equity}
   *
   * Throws NotFoundError if not found.
   */

  static async update(title, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      numEmployees: "num_employees",
      logoUrl: "logo_url",
    });
    const titleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE title = ${titleVarIdx} 
                      RETURNING title, 
                                title, 
                                description, 
                                num_employees AS "numEmployees", 
                                logo_url AS "logoUrl"`;
    const result = await db.query(querySql, [...values, title]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${title}`);

    return job;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if job not found.
   **/

  static async remove(title) {
    const result = await db.query(
      `DELETE
           FROM jobs
           WHERE title = $1
           RETURNING title`,
      [title]
    );
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${title}`);
  }
}

module.exports = Job;
