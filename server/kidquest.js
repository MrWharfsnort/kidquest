/* jshint esversion: 6 */

// SET GLOBALS
var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    passportJWT = require('passport-jwt'),
    LocalStrategy = require("passport-local").Strategy,
	JwtStrategy = require("passport-jwt").Strategy,
	ExtractJwt = require("passport-jwt").ExtractJwt,
    path = require('path'),
    cors = require('cors'),
    app = express(),
    port = process.env.port || 3002,
    User = require('./schemas/UserSchema.js')(mongoose, Child),
    Child = require('./schemas/ChildSchema.js')(mongoose, User),
    Quest = require('./schemas/QuestSchema.js')(mongoose, LootItem),
    LootItem = require('./schemas/LootItemSchema.js')(mongoose);

var secret = 't67uhy78iju3hy2748tritj42hy8w';

// this silences the error about mongo's mpromise library
mongoose.Promise = global.Promise;

//  connect to mongo
mongoose.connect("mongodb://localhost");

//  BODY-PARSER CONFIG
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: true
}));

// initialize passport
app.use(passport.initialize());

// PASSPORT JWT CONFIG
passport.use(new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromAuthHeader(),
    	secretOrKey: secret
	}, function(jwt_payload, done) {

	// replace this with User.find (mongoose)
	User.findOne({_id: jwt_payload._id}, (err, user) => {
        if (err) {
            done(err, false);
        } else if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));

// PASSPORT LOCALSTRATEGY CONFIG
passport.use(new LocalStrategy(
	{usernameField: "email", passwordField: "password"},
	(email, password, done) => {
		// Replace this with User.find (mongoose)
		User.findOne({ email: email, password: password}, (err, user) => {
            if (user) {
                user = user.toObject();

                user.jwt = jwt.sign({
                    _id: user._id
                }, secret, {
                    expiresIn: 604800 // 7 days (in seconds)
                });
                return done(null, user);

            } else {
                return done(null, false, {message: "Incorrect username or password" });
            }
        });
	}
));

// USER REGISTRATION
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
                    return;
                }

                newUser = newUser.toObject();

                newUser.jwt = jwt.sign({
                    _id: newUser._id
                }, secret, {
                    expiresIn: 604800 // 7 days in seconds
                });

                console.info('User ' + req.body.name + ' added');
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

// USER LOGIN
app.post('/user/login',	passport.authenticate("local", {session: false}), (req, res) => {
    if (req.user) {
        res.send({status: "success", user: req.user});
    } else {
        res.send({status: "error", message: "Incorrect username or password."});
    }
});

// GET USER BY ID
app.get('/user', passport.authenticate("jwt", {session: false}), (req, res) => {

    User.findById(req.user._id, (err, user) => {
        if (err) {
            res.send({status: 'error', message: 'err'});
            return;
        }

        user = user.toObject();

        user.jwt = jwt.sign({
            _id: user._id
        }, secret, {
            expiresIn: 604800 // 7 days in seconds
        });

        res.send({status: 'success', user: user});
    });
});

// ADD A NEW CHILD TO USER + CHILD COLLECTION
app.post('/user/child', passport.authenticate("jwt", {session: false}), (req, res) => {
    if (!req.user) {
        res.send({status: 'unauthorized', message: 'you must be logged in'});
        return;
    }

    Child.find({ name: req.body.name, parent: req.user._id }, (err, child) => {
        if (err) {
            res.send({message: 'server error: ' + err});
            return;
        } else if (child.length === 0) {
            var newChild = new Child({
                name: {
                    first: req.body.name.first,
                    last: req.body.name.last
                },
                password: req.body.password,
                parent: req.user._id,
                activeQuests: [],
                hero:  {
                    name: req.body.name.first,
                    inventory: [],
                    credits: 0,
                    level: 1,
                    xp: 0,
                    strength: 0,
                    wisdom: 0,
                    kindness: 0,
                    courage: 0,
                    responsibility: 0
                }
            });

            newChild.save((err, child) => {
                if (err) {
                    console.log('Unable to add child: ', err);
                    return;
                } else {
                    console.log('Child added: ', child);
                }

                var childId = child._id;

                User.findOneAndUpdate(
                    { _id: req.user._id },
                    { $push: { children: childId } },
                    {new: true},
                    (err, data) => {
                        if (err) {
                            console.log('Unable to add child to user', err);
                            return;
                        } else {
                            console.log('Child ' + childId + ' added');
                            res.send({status: 'success', newChild: child});
                        }
                    }
                );
            });
        }
    });
});

// GET A LIST OF USERS' CHILDREN'
app.get('/user/children', passport.authenticate('jwt', {session: false}), (req, res) => {
    Child.find({parent: req.user._id}, (err, children) => {
        if (err) {
            res.send({status: 'error', message: 'unable to retrieve children ' + err});
            return;
        }

        res.send({status: 'success', children: children});
    });
});

// DELETE A CHILD FROM USER.CHILDREN AND CHILD COLLECTION
app.post('/child/delete', passport.authenticate('jwt', {session: false}), (req, res) => {

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { "children": req.body._id } },
        { new: true},
        (err, done) => {
            if (err) {
                console.log('error removing kid', err);
                return;
            } else {
                console.log(done);
            }
        }
    );

    Child.remove({_id: req.body._id}, (err, data) => {
        if (err) {
            res.send({status: 'error', message: err});
        } else {
            res.send({status: 'success', message: 'child removed'});
        }
    });

});

// ADD A NEW QUEST
app.post('/quest/add', passport.authenticate('jwt', {session: false}), (req, res) => {

    var statRoll = function() {
        return Math.floor((Math.random() * 3));
    };

    var newQuest = new Quest({
        title: req.body.title,
        description: req.body.description,
        parent: req.user._id,
        isAccepted: false,
        isCompleted: false,
        lootTable: [],
        rewards: {
            strength: statRoll(),
            wisdom: statRoll(),
            kindness: statRoll(),
            courage: statRoll(),
            responsibility: statRoll()
        }

    });

    newQuest.save(newQuest, (err, quest) => {
        if (err) {
            res.send({status: 'error', message: err });
            return;
        } else {
            console.log('New quest created: ', quest);
            res.send({status: 'success', message: 'quest ' + quest._id + ' added', quest: quest});
        }
    });
});

// GET QUESTS THE USER HAS ADDED
app.get('/user/quests', passport.authenticate('jwt', {session: false}), (req, res) => {
    Quest.find({ parent : req.user._id }, (err, quests) => {
        if (err) {
            res.send({ status: 'error', message: 'unable to retrieve quests due to : ' + err });
            return;
        }

        res.send({ status: 'success', quests: quests });
    });
});

// GET QUESTS FOR THE HERO
app.get('/hero/quests', passport.authenticate('jwt', {session: false}), (req, res) => {
    var questId = '';

    // Child.find({ parent: req.user.id }, {(err, child) => {


    // });

    Quest.find({"parent": req.user._id}, (err, quests) => {
        if (err) {
            res.send({ status: 'error', message: 'unable to retrieve quests due to : ' + err });
            return;
        }

        res.send({ status: 'success', quests: quests });
    });
});

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

