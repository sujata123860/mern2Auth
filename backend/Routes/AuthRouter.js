const route = require("express").Router();
const { signup, login } = require("../Controllers/AuthController");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation");
route.post("/login", loginValidation, login);
route.post("/signup", signupValidation, signup);

module.exports = route;
