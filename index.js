"use strict";

//express lib
var express = require('express');
var cons = require('consolidate');
//inspect
var util = require('util');

//instantiate express
var app = express();
var session = require('express-session');
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

// Utilizzo Mustache come template engine
app.engine('html', cons.mustache);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var model = require('./model.js');
//POST
var bodyParser = require('body-parser');

// Templates

app.use(bodyParser.urlencoded({extended: false}));

//JSON post
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 1337));

//use: for both POST and GET

// Servo tutti i file client side: immagini, css e JavaScript client side
app.use('/static', express.static('static'));

// Questa view mostra i pasti desiderati
app.get('/pasto/:id(\\d+)/', function (request, response) {
    var pasto = model.get_pasto(parseInt(request.params.id));
    if (pasto === undefined) {
        response.sendStatus(404);
    } else {
        response.render('pasto', pasto);
    }
});

// Ritorna il JSON del pasto generato
app.get('/getPasto/:id(\\d+)/', function (request, response) {
    var pasto = model.get_pasto(parseInt(request.params.id));
    if (pasto === undefined) {
        response.sendStatus(404);
    } else {
        response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
        response.end(JSON.stringify(pasto));
    }
});

app.get('/menu', function (request, response) {
    response.render('menu', model.get_pasti());
});

app.post('/conferma-ordine', function (request, response) {
    var pasti = [];
    var calorie = 0;
    for (var i = 0; i < request.body.pasti.length; i++) {
        var pasto = model.get_pasto(request.body.pasti[i]);
        calorie += pasto['KCal'];
        pasti.push(pasto);
    }
    request.session.data = pasti;
    request.session.tot = calorie;
    response.redirect('/riepilogo');
});

app.get('/riepilogo', function (request, response) {
    response.render('riepilogo', {"pasti": request.session.data, "totale": request.session.tot});
});

app.get('/valuta', function (request, response) {
    response.render('valuta');
});


app.use('/', function (request, response) {
    response.render('index');
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on http://localhost:' + app.get('port') + '/');
});