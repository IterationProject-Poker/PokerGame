const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/poker-game");
autoIncrement.initialize(connection);

const userSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  balance: {type: Number, default: 100},
  games: {type: Array, default: []},
});

userSchema.plugin(autoIncrement.plugin, 'User');
var User = connection.model('User', userSchema);

module.exports = User;
