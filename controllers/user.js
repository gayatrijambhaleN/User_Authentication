const { validationResult } = require("express-validator");
const user = require("../models/user");
const User = require("../models/user");
const Data = require("../models/tournament");
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
    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.SECRET,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;

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
    const token = req.headers["x-access-token"];

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
    const { _id, name, email } = user;
    return res.json({
      message: "Logged in Successfully",
      user: {
        _id,
        name,
        email,
      },
    });
  });
};

exports.tournament = (req, res) => {
  const { tournament, startdate, enddate } = req.body;

  //  create token
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    console.log("I am here", decoded);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  //send response
  return res.json({
    message: "Tournament created Successfully",
    tournament,
    startdate,
    enddate,
  });
};
