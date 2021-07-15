const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
     title: String,
     year: Number,
     description: String,
     country: String,
     genre: String,
     release_date: String,
     cast: String,
     language: String,
     download: String
 });
 
 module.exports = mongoose.model('Movie', movieSchema);