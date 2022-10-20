/** User class for message.ly */

const db = require("../db");
const ExpressError = require("../expressError");

const bcrypt = require("bcrypt");

const config = require("../config.js");

/** User of the site. */

class User {
  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({ username, password, first_name, last_name, phone }) {
    const hashedPassword = await bcrypt.hash(
      password,
      config.BCRYPT_WORK_FACTOR
    );
    const result = await db.query(
      `INSERT INTO users (
            username, 
            password, 
            first_name, 
            last_name, 
            phone,
            join_at,
            last_login_at)
          VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)
          RETURNING username, password, first_name, last_name, phone`,
      [username, hashedPassword, first_name, last_name, phone]
    );

    return result.rows[0];
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT 
            username, 
            password
          FROM users
          WHERE username = $1`,
      [username]
    );

    let u = result.rows[0];

    if (!u) {
      throw new ExpressError(`No such user: ${username}`, 404);
    }

    if ((await bcrypt.compare(password, u.password)) === true) {
      return true;
    }

    return false;
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    const result = await db.query(
      `UPDATE users
         SET last_login_at = current_timestamp
         WHERE username = $1
         RETURNING username, last_login_at`,
      [username]
    );

    if (!result.rows[0]) {
      throw new ExpressError(`No such user: ${username}`, 404);
    }

    return result.rows[0];
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    const result = await db.query(
      `SELECT username, first_name, last_name, phone
          FROM users`
    );

    return result.rows;
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    const result = await db.query(
      `SELECT 
            username, 
            first_name, 
            last_name, 
            phone, 
            join_at, 
            last_login_at
          FROM users
          WHERE username = $1`,
      [username]
    );

    let u = result.rows[0];

    if (!u) {
      throw new ExpressError(`No such user: ${username}`, 404);
    }

    return u;
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    const result = await db.query(
      `SELECT id, to_username, body, sent_at, read_at FROM messages 
             WHERE from_username = $1`,
      [username]
    );

    let messages = result.rows;

    if (!messages) {
      throw new ExpressError(`No such user: ${username}`, 404);
    }

    for (let message in messages) {
      //this is a dirty way to do this but it works
      messages[message].to_user = await this.get(messages[message].to_username);
      delete messages[message].to_username;
      delete messages[message].to_user.join_at;
      delete messages[message].to_user.last_login_at;
    }

    return messages;
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) {
    const result = await db.query(
      `SELECT id, from_username, body, sent_at, read_at FROM messages 
             WHERE to_username = $1`,
      [username]
    );

    let messages = result.rows;

    if (!messages) {
      throw new ExpressError(`No such user: ${username}`, 404);
    }

    for (let message in messages) {
      //this is a dirty way to do this but it works
      messages[message].from_user = await this.get(
        messages[message].from_username
      );
      delete messages[message].from_username;
      delete messages[message].from_user.join_at;
      delete messages[message].from_user.last_login_at;
    }

    return messages;
  }
}

module.exports = User;
