const express = require("express");
const { signup, signin, create, tournament } = require("../controllers/user");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/signup",
  [
    check("name", "Name should be atleast 1 characters").isLength(),
    check("email", "Email should be valid").isEmail(),
    check("password", "Password should be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  signup
);

router.post("/signin", signin);

router.post("/create", create);

router.post(
  "/tournament",
  [
    check("tournament", "Name should be atleast 1 characters").isLength(),
    check("startdate", "Date should be valid").isDate(),
    check("enddate", "Date should be valid").isDate(),
  ],
  tournament
);

module.exports = router;
