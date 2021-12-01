const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();

// DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.log("Database is not connected");
    console.log("err", err);
  });

// MiddleWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Import Routes
const userRoutes = require("./routes/user");

// Use Routes
app.use("/api", userRoutes);

// PORT
const port = process.env.PORT || 8000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
