const express = require("express");
const router = express.Router();
const auth = require("../../middelware/auth");

//Item Model
const Item = require("../../models/Items");

//@route gET API/ITEMS
//@DESC gET All Items
// @access Public

router.get("/", (req, res) => {
  Item.find({})
    .sort({ date: -1 })
    .then(items => res.json(items));
});

//@route post API/ITEMS
//@DESC create a post
// @access Public
router.post("/", auth, (req, res) => {
  console.log(auth);
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save().then(item => res.json(item));
});

//@route Delete api/items/:id
//@DESC delete a post
// @access Public
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ sucess: true })))
    .catch(err => res.status(404).json({ sucess: false }));
});

module.exports = router;
