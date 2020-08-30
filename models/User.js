const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var user = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      maxlength: 32,
    },
    firstname: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    password: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    gender: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

user.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

user.methods.comparePassword = function (candidatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  });
};

module.exports = mongoose.model("User", user);
