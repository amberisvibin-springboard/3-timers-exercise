// connect to right DB --- set before loading db.js
process.env.NODE_ENV = "test";

// npm packages
const request = require("supertest");

// app imports
const app = require("../app");
const db = require("../db");

let testInvoice;

beforeEach(async function () {
  await db.query(`
    INSERT INTO
      companies VALUES ('apple', 'Apple Computer', 'Maker of OSX.')
      RETURNING *`);
  let result = await db.query(`
    INSERT INTO invoices (comp_Code, amt, paid, paid_date)
      VALUES ('apple', 100, false, null)
      RETURNING *`);
  testInvoice = result.rows[0];
});

afterEach(async function () {
  // delete any data created by test
  await db.query("DELETE FROM invoices");
  await db.query("DELETE FROM companies");
});

afterAll(async function () {
  // close db connection
  await db.end();
});

/** GET /invoices - returns `[invoices, ...]` */

describe("GET /invoices", function () {
  test("Gets a list of 1 invoice", async function () {
    const response = await request(app).get(`/invoices`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([
      {
        add_date: expect.any(String),
        amt: 100,
        comp_code: "apple",
        id: testInvoice.id,
        paid: false,
        paid_date: null,
      },
    ]);
  });
});

/** GET /invoices/[id] - return data about one invoice: `[invoice]` */

describe("GET /invoices/:id", function () {
  test("Gets a single invoice", async function () {
    const response = await request(app).get(`/invoices/${testInvoice.id}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([
      {
        add_date: expect.any(String),
        amt: 100,
        comp_code: "apple",
        id: testInvoice.id,
        paid: false,
        paid_date: null,
      },
    ]);
  });

  test("Responds with 404 if can't find invoice", async function () {
    const response = await request(app).get(`/invoices/0`);
    expect(response.statusCode).toEqual(404);
  });
});

/** POST /invoices - create invoices from data; return `[invoice]` */

describe("POST /invoices", function () {
  test("Creates a new invoice", async function () {
    const response = await request(app)
      .post(`/invoices`)
      .send('invoice={"comp_code": "apple", "amt": "200"}');
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      add_date: expect.any(String),
      amt: 200,
      comp_code: "apple",
      id: expect.any(Number),
      paid: false,
      paid_date: null,
    });
  });
});

/** PATCH /invoices/[id] - update invoice; return `[invoice]` */

describe("PATCH /invoices/:id", function () {
  test("Updates a single invoice", async function () {
    const response = await request(app)
      .patch(`/invoices/${testInvoice.id}`)
      .send('invoice={"amt": 350}');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      add_date: expect.any(String),
      amt: 350,
      comp_code: "apple",
      id: testInvoice.id,
      paid: false,
      paid_date: null,
    });
  });

  test("Responds with 404 if can't find invoice", async function () {
    const response = await request(app).patch(`/invoices/0`);
    expect(response.statusCode).toEqual(404);
  });
});

/** DELETE /invoices/[id] - delete invoice,
 *  return `{status: "deleted"}` */

describe("DELETE /invoices/:id", function () {
  test("Deletes a single a invoice", async function () {
    const response = await request(app).delete(`/invoices/${testInvoice.id}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ status: "deleted" });
  });
});
