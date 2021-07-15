const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    Image: String,
     title: String,
     author: String,
     year: String,
     about_author: String,
     genre: String,
     summary: String,
     download_url: String
 });
 
 module.exports = mongoose.model('Book', bookSchema);