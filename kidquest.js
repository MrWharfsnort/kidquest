/* jshint esversion: 6 */

var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path');

var app = express();
var port = process.env.port || 8000;

//  connect to mongo
mongoose.Promise = global.Promise; // this silences the error about mongo's mpromise library
mongoose.connect("mongodb://localhost");

//  basic config for body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// config express-session
app.use(session({
    secret: '98uyhujhgty78iko09i8uyhgt5tghjioplkju89ijhyhy6trdfghjkmnhuio09iuhygf2345tghjk',
    resave: false,
    saveUninitialized: false
}));

var User = require('./schemas/UserSchema.js')(mongoose, Child);
var Child = require('./schemas/ChildSchema.js')(mongoose, User);
var Quest = require('./schemas/QuestSchema.js')(mongoose, LootItem);
var LootItem = require('./schemas/LootItemSchema.js')(mongoose)

app.post('/user/register', (req, res) => {
    // check to see if email already exists in database
    User.find({email: req.body.email}, (err, email) => {
        if (email.length === 0) {
            var newUser = new User({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                type: 'parent',
                children: []
            });
            // if no user exists, save new user to database
            newUser.save((err) => {
                // handle errors on save, just in case
                if (err) {
                    res.status(500);
                    console.error(err);
                    res.send({status: 'error', message: 'unable to register user: ' + err});
                }

                console.info('User ' + req.body.name + ' added');

                res.send({status: 'registered',
                    message: 'user ' + req.body.name + ' was successfully registered'
                });
            });
        } else if (err) {
            res.status(500);
            res.send({status: 'error', message: 'server error: ' + err});
        } else {
            res.status(400);
            res.send({status: 'error', message: 'email address is already in use'});
        }
    });
});


/*

    POST /user/register
    (Add a new user)

    POST /user/login
    (User Login)

    POST /user/:id/child
    (Add a new child)

    GET /user/:id/children
    (Get children of User)
    should look in user.children array and return the objects in child collection based on those id numbers
    find {}

    POST /api/quest
    (Add a new quest)

    GET /api/quest/:id
    (Get quest by ID)

    GET /user/:id
    (Get user by ID)

*/

// handle 404 error
app.use((req, res, next) => {
    res.status(404);
    res.send({message: 'File not found'});
});

// handle 500 errors
app.use((err, req, res, next) => {
    res.status(500);
    res.send({message: 'Server error, ' + err});
});


// server start
app.listen(port, () => {
    console.log('KidQuest API is running on localhost:' + port);
});

