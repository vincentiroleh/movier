"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();

// Middleware
app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(_express2.default.static('public'));

// Route
app.get('/', function (req, res) {
    res.redirect('search');
});

app.get('/results', function (req, res) {
    var query = req.query.search;
    var myAPIKey = process.env.MYAPIKEY;

    (0, _request2.default)("https://api.themoviedb.org/3/search/movie?api_key=" + myAPIKey + "&query=" + query, function (err, response, body) {
        if (err) console.log(err);

        var data = JSON.parse(body);
        res.render('movies', { data: data, searchQuery: query });
    });
});

app.get('/search', function (req, res) {
    res.render('search');
});

// Setup Port
var PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log("Server running at http://localhost:" + PORT);
});