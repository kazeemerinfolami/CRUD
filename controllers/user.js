const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const {
    username,
    password,
    firstname,
    lastname,
    gender,
    date_of_birth,
  } = req.body;

  try {
    const user = new User({
      username,
      password,
      firstname,
      lastname,
      gender,
      date_of_birth,
    });
    await user.save();
    user.password = undefined;
    user.username = undefined;
    res.json(user);
  } catch (err) {
    return res.status(422).send(err.message);
  }
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;
  console.log("users:", username, password);
  if (!username || !password) {
    return res
      .status(422)
      .send({ error: "Must provide username and password" });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(422).send({ error: "Invalid password or username" });
  }
  try {
    await user.comparePassword(password);
    //const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ user });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or username" });
  }
};

//http://localhost:2000/api/users?sortBy=createdAt&order=asc&limit=2
exports.list = async (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "firstname";
  let limit = req.query.limit ? parseInt(req.query.limit) : 25;

  await User.find()
    .select("-password")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, user) => {
      if (!user || err) {
        return res.status(400).json({
          error: "users not found",
        });
      }
      res.json(user);
    });
};

exports.findUserById = async function (req, res, next) {
  await User.findById(req.params.id, function (err, user) {
    if (!user || err) {
      return res.status(400).json({
        error: "user not found",
      });
    }

    user.password = undefined;
    res.json(user);
  });
};

/* UPDATE */
exports.updateUser = async function (req, res, next) {
  await User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    if (!user || err) {
      return res.status(400).json({
        error: "user not found",
      });
    }

    user.password = undefined;
    res.json({ message: "Updated Successfully!" });
  });
};

/* DELETE  */
exports.deleteUser = async function (req, res, next) {
  await User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
    if (!user || err) {
      return res.status(400).json({
        error: "user not found",
      });
    }
    res.json({ message: "Deleted Successfully!" });
  });
};
