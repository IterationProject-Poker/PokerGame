const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/poker-game");
// var connection = mongoose.createConnection('mongodb://getmorejackets:bitchfuck1@ds137110.mlab.com:37110/getmorejacket');

autoIncrement.initialize(connection);

const gameSchema = new Schema({
  players: {type: Array, required: true},
  hands: {type: Array, default: []}
});

gameSchema.plugin(autoIncrement.plugin, 'Game');
var Game = connection.model('Game', gameSchema);

module.exports = Game;
