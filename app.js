var restify = require('restify');
var plugins = require('restify-plugins');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');    

var models = require('./models').models;
var loginModels = require('./login_models');

// var urlencodedParser = bodyParser.urlencoded({ extended: false })
//var listUsers = new Array();

//CONNECT TO db
var mongo_url = "mongodb://127.0.0.1:27017/test";
mongoose.connect(mongo_url, function(err, res) {

    if(err) {
        console.log('ERROR conneting to ' + mongo_url + err);
    }
    else{
        console.log('Successfully connected to '+ mongo_url );
    }

});

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());
server.use(bodyParser.urlencoded({ extended: false }));

// server.use(restify.acceptParser(server.acceptable));
// server.use(restify.queryParser());
// server.use(restify.bodyParser());
// server.use(restify.urlEncodedBodyParser({ mapParams : false }));


server.listen(5000, function () {
  console.log('%s listening at %s', server.name, server.url);
});


server.get("/", function(req, res, next) { res.send(200, {message: 'Welcome to my API!'})});

server.post("/user/add", function(req, res, next){

    let first_name = "Trish";
    let last_name = "Corpuz";
    let username = "trish.corpuz";
    let password = "1234";

    let new_user = new models.User();
    new_user.first_name = first_name;
    new_user.last_name = last_name;
    new_user.username = username;
    new_user.password = password;
    new_user.save(function(err, savedData){
        if(!err){
            res.send(200, {msg: 'User saved successfully', data: savedData});
        }
        else{
            res.send(500, err);
        }
    });    
});



server.post("/login", function(req, res, next){


 console.log("input", req.body.username);

    var user_model = mongoose.model('User');

 user_model.findOne({$and: [{'username':  req.body.username }, { 'password': req.body.password }]}
 , function (err, user) {

  if (err) return handleError(err);

  console.log("success", user);

if(user == null || user == "null"){
     res.send(500, {msg: 'Invalid username or password'});
} else {
    res.send(200, {msg: 'login successfully'});
}


});  

});




// server.get('/echo/:name', function (req, res, next) {
//   res.send(req.params);
//   return next();
// });




// // This get method users
// server.get('/getUsers', function (req, res) {

//    console.log("Got a GET request for /getUsers");

//   res.setHeader('Content-Type', 'application/json');

//   var MongoClient = require('mongodb').MongoClient
//     , format = require('util').format;


// MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
//     if(err) throw err;

//      var collection = db.collection('users');


//     collection.find().toArray(function(err, results) {
//         console.dir(JSON.stringify(results));

//          var data_from_db = results;

//           var jsonData = {

//             "Status": "200",
//             "Message": "Display all users",
//             "Data": data_from_db

//         }


//          res.send(jsonData);

//         db.close();
//     });

// });

// });


// server.post('/addUsers', function(req, res){
// 	MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
//     if(err) throw err;

//     var collection = db.collection('users');


//     var document = { 
//                      username: req.body.username,
//                      password: req.body.password
//                  };


//     collection.insert({

//         document

//     }, function(err, docs) {
//         collection.count(function(err, count) {
//             console.log(format("count = 2", 11));
//         });
//     });

//     collection.find().toArray(function(err, results) {
//         console.dir(results);
//         db.close();
//     });

// });

// });


// // This post login method
// server.post('/postLogin', function(req, res) {   
//    console.log("Got a POST request for /postLogin");

//    response = {
       
//                   username:req.body.username,
//                   password:req.body.password

//               };

//    console.log(response);

//    var jsonObject = response;
//    var inputUsername = jsonObject.username;
//    var inputPassword = jsonObject.password;




//  var MongoClient = require('mongodb').MongoClient
//     , format = require('util').format;

// MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
//     if(err) throw err;

//      var collection = db.collection('users');


// collection.findOne({'username': inputUsername}, function(e,o) {

// 	if (o == null) {

// 			 var resultObject = {
//                 "Status": "200",
//                 "Message": "User not registered",
//                 "Data": {} 
// 		      };

// 		        res.end(JSON.stringify(resultObject));			
// 	} else {
// 		collection.findOne({'password': inputPassword}, function(err, results) {
// 				if (results) {
// 						   var resultObject = {
// 			                  "Status": "200",
// 			                   "Message": "Login successful",
// 			                    "Data": {
// 			                   "user_name":jsonObject.username,
// 			                   "password":jsonObject.password,
// 			                   "email": "trish@yahoo.com",
// 			                  "uid": 1100

// 			                } 
// 			      		};

// 			       res.end(JSON.stringify(resultObject)); 		
// 			   } else {

// 				   		var resultObject = {
// 			                "Status": "200",
// 			                "Message": "Invalid password!"
// 					      };

// 					        res.end(JSON.stringify(resultObject));
// 			   }
// 			}


// 			);
// 	}


// }

// 	);

 
//   db.close();

// });


// });



