/* jshint esversion: 6 */

var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path');

var app = express();
var port = process.env.port || 8000;

/*
    (Add a new quest)
        POST /api/quest
    (Get quest by ID)
        GET /api/quest/:id
    (Add a new user)
        POST /api/user
    (Get user by ID)
        GET /api/user/:id
    (Add a new child)
        POST /api/user/child
    (Get children of User)
        GET /api/user/children
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

