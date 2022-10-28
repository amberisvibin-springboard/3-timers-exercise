const { SECRET_KEY } = require("../config");

const app = require("../app");

const db = require("../db.js");
const User = require("../models/user");
const Company = require("../models/company");
const { createToken } = require("../helpers/tokens");
