const express = require("express");
const ExpressError = require("../expressError");

const User = require("../models/user");

const router = new express.Router();

const jwt = require("jsonwebtoken");

const SECRET_KEY = "oh-so-secret";
const JWT_OPTIONS = { expiresIn: 60 * 60 }; // 1 hour

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    let logged_in = User.authenticate(username, password);

    if (!logged_in) {
      throw new ExpressError(`Unable to log in user: ${username}`, 401);
    }

    User.updateLoginTimestamp(username);

    let token = jwt.sign({ username }, SECRET_KEY);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post("/register", async function (req, res, next) {
  try {
    const { username, password, first_name, last_name, phone } = req.body;
    let logged_in = User.register(
      username,
      password,
      first_name,
      last_name,
      phone
    );

    if (!logged_in) {
      throw new ExpressError(`Unable to log in user: ${username}`, 401);
    }

    User.updateLoginTimestamp(username);

    let token = jwt.sign({ username }, SECRET_KEY);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
