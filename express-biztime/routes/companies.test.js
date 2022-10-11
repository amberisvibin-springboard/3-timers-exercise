// connect to right DB --- set before loading db.js
process.env.NODE_ENV = "test";

// npm packages
const request = require("supertest");

// app imports
const app = require("../app");
const db = require("../db");

let testCompany;

beforeEach(async function () {
  let result = await db.query(`
    INSERT INTO
      companies VALUES ('apple', 'Apple Computer', 'Maker of OSX.')
      RETURNING *`);
  testCompany = result.rows[0];
});

afterEach(async function () {
  // delete any data created by test
  await db.query("DELETE FROM companies");
});

afterAll(async function () {
  // close db connection
  await db.end();
});

/** GET /companies - returns `[companies, ...]` */

describe("GET /companies", function () {
  test("Gets a list of 1 company", async function () {
    const response = await request(app).get(`/companies`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([testCompany]);
  });
});

/** GET /companies/[code] - return data about one company: `[company]` */

describe("GET /companies/:code", function () {
  test("Gets a single company", async function () {
    const response = await request(app).get(`/companies/${testCompany.code}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([testCompany]);
  });

  test("Responds with 404 if can't find company", async function () {
    const response = await request(app).get(`/companies/0`);
    expect(response.statusCode).toEqual(404);
  });
});

/** POST /companies - create companies from data; return `[company]` */

describe("POST /companies", function () {
  test("Creates a new company", async function () {
    const response = await request(app)
      .post(`/companies`)
      .send(
        'company={"code": "ibm", "name": "IBM", "description": "Big blue."}'
      );
    //expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      code: "ibm",
      name: "IBM",
      description: "Big blue.",
    });
  });
});

/** PATCH /companies/[code] - update company; return `[company]` */

describe("PATCH /companies/:code", function () {
  test("Updates a single company", async function () {
    const response = await request(app)
      .patch(`/companies/${testCompany.code}`)
      .send('company={"name": "Apple 2", "description": "Maker of MacOS 13."}');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      code: "apple",
      name: "Apple 2",
      description: "Maker of MacOS 13.",
    });
  });

  test("Responds with 404 if can't find company", async function () {
    const response = await request(app).patch(`/companies/0`);
    expect(response.statusCode).toEqual(404);
  });
});

/** DELETE /companies/[code] - delete company,
 *  return `{status: "deleted"}` */

describe("DELETE /companies/:code", function () {
  test("Deletes a single a company", async function () {
    const response = await request(app).delete(
      `/companies/${testCompany.code}`
    );
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ status: "deleted" });
  });
});
