var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    password: String, //bcrypt plugin to hash
    time_stamp: {type: Date, default: Date.now}
});

var models = { 
    User: mongoose.model('User', userSchema)
}

module.exports = {
    models: models
}