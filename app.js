const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");

// routes
const userRoutes = require("./routes/user");

require("dotenv").config();
const app = express();

// connect to mongo
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch((err) => {
    console.log(err.message);
  });

//  middleware //app.js
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// routes middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
