const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const { ObjectId } = mongoose.Schema;

const tournamentSchema = new mongoose.Schema(
  {
    tournament: {
      type: String,
      maxlength: 2000,
      trim: true,
    },

    startdate: {
      type: Date,
      required: true,
      maxlength: 32,
      trim: true,
    },

    enddate: {
      type: Date,
      required: true,
      maxlength: 32,
      trim: true,
    },
    token: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", tournamentSchema);
