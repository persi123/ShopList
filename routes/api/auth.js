const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middelware/auth");

//Item Model
const User = require("../../models/User");

//@route post API/auth
//@DESC authenticate user
// @access Public

router.post("/", (req, res) => {
  const { email, password } = req.body;

  //validation for email & password
  if (!email || !password) {
    return res.status(400).json({ msg: "please enter all fields " });
  }

  //check existing user
  User.findOne({ email }).then(user => {
    console.log(email, password);
    if (!user) {
      console.log(user);
      return res.status(400).json({ msg: "User doesn't exist" });
    }

    // validate password
    bcrypt.compare(password, user.password, function(err, isMatch) {
      if (isMatch) {
        jwt.sign(
          { id: user.id },
          config.get("jwtSecret"),
          { expiresIn: 100000 },
          (err, token) => {
            if (err) throw err;

            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            });
          }
        );
      } else {
        return res.status(400).json({ msg: "password is incorrect" });
      }
    });
  });
  //   .catch(err => {
  //     console.log(err);
  //     return res.status(400).json({ msg: err });
  //   });
});

//@route post API/auth
//@DESC authenticate user
// @access Public

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
