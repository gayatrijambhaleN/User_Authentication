const { validationResult } = require("express-validator");
const user = require("../models/user");
const User = require("../models/user");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  console.log(user);
  return user.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        eroor: "Unable to add user",
      });
    }
    console.log(data);
    return res.json({
      message: "success",
      data,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  user.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email was not found",
      });
    }

    //Authenticate user
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email password do not match",
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // put token in cookie
    res.cookie("token", token, { expire: new Date() + 1 });

    //send response
    const { _id, name, email } = user;
    return res.json({
      token,
      user: {
        _id,
        name,
        email,
      },
    });
  });
};

exports.create = (req, res) => {
  const { email, password } = req.body;

  user.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email was not found",
      });
    }

    //Authenticate user
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email password do not match",
      });
    }

    //  create token
    const token = req.body.token;
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }

    //send response
    const { _id, firstname, email } = user;
    return res.json({
      message: "created By",
      // token,
      user: {
        _id,
        firstname,
        email,
      },
    });
  });
};
