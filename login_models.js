var mongoose = require('mongoose');

var loginSchema = new mongoose.Schema({
    username: String,
    password: String
}, {collection: 'Login'});

var models = { 
    Login: mongoose.model('Login', loginSchema)
}

module.exports = {
    models: models
}