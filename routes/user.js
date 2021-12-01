const express = require("express");
const { signup, signin, create } = require("../controllers/user");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/signup",
  [
    check("firstname", "Name should be atleast 1 characters").isLength({
      min: 1,
    }),
    check("lastname", "Name should be atleast 1 characters").isLength({
      min: 1,
    }),

    check("email", "Email should be valid").isEmail(),
    check("password", "Password should be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  signup
);

router.post("/signin", signin);

router.post("/create", create);

module.exports = router;
