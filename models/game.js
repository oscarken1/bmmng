const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
     title: String,
     year: Number,
     description: String,
     country: String,
     genre: String,
     release_date: String,
     owner: String,
     language: String,
     download: String
 });
 
 module.exports = mongoose.model('Game', gameSchema);