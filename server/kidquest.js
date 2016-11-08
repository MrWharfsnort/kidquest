/* jshint esversion: 6 */

var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    cors = require('cors'),
    app = express(),
    port = process.env.port || 3002;

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
app.use(cors({
    credentials: true,
    origin: true
}));

// config express-session
app.use(session({
    secret: '98uyhujhgty78iko09i8uyhgt5tghjioplkju89ijhyhy6trdfghjkmnhuio09iuhygf2345tghjk',
    resave: false,
    cookie: {
        secure: false
    },
    saveUninitialized: true
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
                    console.error(err);
                    res.send({status: 'error', message: 'unable to register user: ' + err});
                }

                console.info('User ' + req.body.name + ' added');
                req.session.user = newUser._id;
                res.send({status: 'registered',
                    user: newUser
                });
            });
        } else if (err) {
            res.send({status: 'error', message: 'server error: ' + err});
        } else {
            res.send({status: 'error', message: 'an account with this email is already registered'});
        }
    });
});

// user login
app.post('/user/login', (req, res) => {
    // don't give us blank info
    if (!req.body.email || !req.body.password) {
        res.send({status: 'unauthorized', message: 'you must provide a username and password'});
        return;
    }

    User.find({ email: req.body.email }, (err, user) => {
        if (err) {
            res.send({status: 'error', message: 'something went wrong: ' + err });
            return;
        }
        else if (user.length === 0 || user[0].password !== req.body.password) {
            res.send({status: 'unauthorized', message: 'unable to log in'});
            console.log(user[0]);
            console.info('unauthorized attempt for user: ', req.body.username);
            return;
        } else {
            req.session.user = user[0]._id;
            console.log('api-session',req.session);
            res.send({status: 'authorized', authUser: user[0]});
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
app.get('/user', (req, res) => {
    console.log('user-session', req.session.user);
    if (!req.session.user) {
        res.send({status: 'unauthorized', message: 'not authorized to view this information'});
        return;
    }

    User.findById(req.session.user, (err, user) => {
        if (err) {
            res.send({status: 'error', message: 'err'});
            return;
        }

        res.send({status: 'success', user: user});
    });
});


app.post('/user/child', (req, res) => {
    if (!req.session) {
        res.send({status: 'unauthorized', message: 'you must be logged in'});
        return;
    }

    Child.find({ name: req.body.name, parent: req.session.user }, (err, child) => {
        if (err) {
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
    res.send({message: 'File not found'});
});

// handle 500 errors
app.use((err, req, res, next) => {
    console.log('server error', err);
    res.send({status: 'error', message: 'Server error'});
});

// server start
app.listen(port, () => {
    console.log('KidQuest API is running on localhost:' + port);
});

