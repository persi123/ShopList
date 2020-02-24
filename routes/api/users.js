const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Item Model
const User = require("../../models/User");

//@route gET API/users
//@DESC register new user
// @access Public

router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //validation for email & password
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "please enter all fields " });
  }

  //check existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exist" });

    const newUser = new User({
      name,
      email,
      password
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
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
        });
      });
    });
  });
});

//@route post API/ITEMS
//@DESC create a post
// @access Public
// router.post("/", (req, res) => {
//   const newItem = new Item({
//     name: req.body.name
//   });
//   newItem.save().then(item => res.json(item));
// });

// //@route Delete api/items/:id
// //@DESC delete a post
// // @access Public
// router.delete("/:id", (req, res) => {
//   Item.findById(req.params.id)
//     .then(item => item.remove().then(() => res.json({ sucess: true })))
//     .catch(err => res.status(404).json({ sucess: false }));
// });

module.exports = router;
