var express = require("express");
const bcrypt = require('bcrypt');
var app = express();

const mongodb = require('mongodb');
let uri = 'mongodb://oliver45:oliver45@ds121345.mlab.com:21345/mark2test';
let hash = bcrypt.hashSync('chuy123', 10);
let hash2 = bcrypt.hashSync('paola123', 10);
let hash3 = bcrypt.hashSync('fernando123', 10);





mongodb.MongoClient.connect(uri, function(err, client) {
let db = client.db('mark2test');
let users = db.collection('users');
let events = db.collection('events');


users.insert({"_id":1,email:"chuy@gmail.com", nombre: "Jesus Diaz Perez", password: hash });
users.insert({"_id":2,email:"paola@gmail.com", nombre: "Paola Mendez Bravo", password: hash2 });
users.insert({"_id":3,email:"fer@gmail.com", nombre: "Fernando Ramirez Gonzalez", password: hash3 });


console.log("Exito en la conexion");


});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));
