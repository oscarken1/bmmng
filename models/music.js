const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
     artist: String,
     title: String,
     features: String,
     year: Number,
     description: String,
     country: String,
     genre: String,
     release_date: String,
     language: String,
     download_url: String
 });
 
 module.exports = mongoose.model('Music', musicSchema);