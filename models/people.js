
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const peopleSchema = new Schema({
    name: String,
    image: String,
    title: String
}, { timestamps: true });

module.exports = mongoose.model('People', peopleSchema);
