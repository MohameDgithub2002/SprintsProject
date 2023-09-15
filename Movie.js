const mongoose = require("mongoose");

const schema = new mongoose.Schema({ 
    name: {type: String},
    genre: {type: String},
    desc: {type: String},
    year: {type: Number},
    rate: {type: Number}

});
const Movie = mongoose.model('Movie', schema);

module.exports = Movie