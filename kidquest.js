/* jshint esversion: 6 */

var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path');

var app = express();
var port = process.env.port || 8000;

var User = require('./schemas/UserSchema.js')(mongoose, Child);
var Child = require('./schemas/ChildSchema.js')(mongoose, User);
var Quest = require('./schemas/QuestSchema.js')(mongoose, LootItem);
var LootItem = require('./schemas/LootItemSchema.js')(mongoose);

// this silences the error about mongo's mpromise library
mongoose.Promise = global.Promise;
//  connect to mongo
mongoose.connect("mongodb://localhost");

//  basic config for body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/node_modules', express.static(__dirname + '/node_modules'));

//The src folder has our static resources (index.html, css, images)
app.use(express.static(__dirname + '/public'));

// config express-session
app.use(session({
    secret: '98uyhujhgty78iko09i8uyhgt5tghjioplkju89ijhyhy6trdfghjkmnhuio09iuhygf2345tghjk',
    resave: false,
    saveUninitialized: false
}));

// user registration
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

// user login
app.post('/user/login', (req, res) => {
    // don't give us blank info
    if (!req.body.email || !req.body.password) {
        res.status(401);
        res.send({status: 'unauthorized', message: 'you must provide a username and password'});
        return;
    }

    User.find({ email: req.body.email }, (err, user) => {
        if (err) {
            res.status(500);
            res.send({status: 'error', message: 'something went wrong: ' + err });
            return;
        }
        else if (user.length === 0 || user[0].password !== req.body.password) {
            res.status(401);
            res.send({status: 'unauthorized', message: 'unable to log in'});
            console.log(user[0]);
            console.info('unauthorized attempt for user: ', req.body.username);
            return;
        } else {
            req.session.user = user[0]._id;
            res.send({status: 'authorized', message: 'successfully logged in'});
            console.info('User ' + user[0].name + ' successfully logged in');
        }
    });

});

//  logout user
app.post('/user/logout', (req, res) => {
    delete req.session;
    res.send({status: 'success', message: 'you have successfully logged out'});
});

// get user by id
app.get('/user/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.send({status: 'error', message: 'err'});
            return;
        } else if (user._id !== req.session.user) {
            res.status(401);
            res.send({status: 'unauthorized', message: 'not authorized to view this information'});
            return;
        }

        res.send({status: 'success', user: user});
    });
});


app.post('/user/child', (req, res) => {
    if (!req.session) {
        res.status(401);
        res.send({status: 'unauthorized', message: 'you must be logged in'});
        return;
    }

    Child.find({ name: req.body.name, parent: req.session.user }, (err, child) => {
        if (err) {
            res.status(500);
            res.send({message: 'server error: ' + err});
            return;
        } else if (child.length === 0) {
            var newChild = new Child({
                name: req.body.childName,
                password: req.body.childPass,
                parent: req.session.user,
                activeQuests: [],
                hero:  {
                    name: req.body.childName,
                    inventory: [],
                    credits: 0,
                    xp: 0,
                    strength: 0,
                    wisdom: 0,
                    kindness: 0,
                    courage: 0,
                    responsibility: 0
                }
            });
        }
    });
});




/*

    POST /user/child
    * (Add a new child)

    GET /user/children
    * (Get children of User)
    should look in user.children array and return the objects in child collection based on those id numbers
    find {}

    POST /api/quest
    * (Add a new quest)

    GET /api/quest/:id
    * (Get quest by ID)

*/

// handle 404 error
app.use((req, res, next) => {
    res.status(404);
    res.send({message: 'File not found'});
});

// handle 500 errors
app.use((err, req, res, next) => {
    res.status(500);
    console.log('server error', err);
    res.send({status: 'error', message: 'Server error'});
});

app.all('/*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// server start
app.listen(port, () => {
    console.log('KidQuest API is running on localhost:' + port);
});

