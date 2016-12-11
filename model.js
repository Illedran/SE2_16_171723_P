"use strict";

var exports = module.exports = {};

var pasti;

// Utilizzo JSMin per rimuovere i commenti nel json
var jsmin = require('jsmin').jsmin;

var fs = require('fs');
fs.readFile('data.json', 'utf8', function (err, data) {
    if (err) throw err;
    pasti = JSON.parse(jsmin(data));
});

exports.get_pasto = function (id) {
    var el = undefined;
    Object.keys(pasti).find(function (key) {
        return pasti[key].find(function (element) {
            el = element['id'] === id ? element : undefined;
            return element['id'] === id;
        });
    });
    return el;
};

exports.get_pasti = function () {
    return pasti;
};