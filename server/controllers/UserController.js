const mongoose = require('mongoose');
const User = require('../../models/User.js');


mongoose.connect('mongodb://localhost/poker-game');

const UserController = {
  createUser: (req, res, next) => {
    User.create(req.body, (err, doc) => {
      if (doc) {
        console.log('User created');
        res.status(200).send('User created');
      } else {
        res.status(404).send('User creation failed');
      }
    });
  },
  validateUser: (req, res, next) => {
    User.findOne({ username: req.body.username, password: req.body.password }, (err, doc) => {
      if (doc) {
        console.log('User logged in');
        res.status(200).send('User logged in');
      } else {
        res.status(404).send('User login failed');
      }
    });
  },
};

module.exports = UserController;
