var express = require("express");
var bodyParser = require('body-parser');
var app = express();
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let uri = 'mongodb://oliver45:oliver45@ds121345.mlab.com:21345/mark2test';
let userId;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
  })



app.post('/login', function(req, res){
    var userPass;
    var username = req.body.user;
    var password = req.body.pass;

    mongodb.MongoClient.connect(uri, function(err, client){
        let db = client.db('mark2test');
        let users = db.collection('users');


        users.find({ email: username }).toArray(function(err, result) {

            if (err) throw err;
            userPass = result[0].password;
            userId = result[0]._id;

            if(bcrypt.compareSync(password, userPass)) {
                res.send('Validado');
            } else {
                res.send('Contraseña no Valida');
            }
        });
    });
});


app.post('/new', function(req, res){
    console.log(userId);
    let idActual = userId;
    mongodb.MongoClient.connect(uri, function(err, client){
        let db = client.db('mark2test');
        let events = db.collection('events');
        let titulo = req.body.title;
        let start = req.body.start;
        let end = req.body.end;
        events.insert({"user_id":idActual,"id":titulo,"title":titulo,"start":start,"end":end});
        res.send("Evento añadido exitosamente")
    });
});

app.get('/all', function(req, res){
    let idActual = userId;

    mongodb.MongoClient.connect(uri, function(err, client){
        let db = client.db('mark2test');
        let events = db.collection('events');

        events.find({ "user_id": idActual }).toArray(function(err, result) {

            if (err) throw err;
            res.json(result);

        });

    });
});

app.post('/delete', function(req, res){
    let eventId = req.body.id;
    let eventTitle = req.body.title;
    let idActual = userId;
    mongodb.MongoClient.connect(uri, function(err, client){
        let db = client.db('mark2test');
        let events = db.collection('events');

        events.remove({ "title": eventTitle })
            res.send("Elemento removido con exito");

        });

    });




app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));
