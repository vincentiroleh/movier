const express = require('express');
const app = express();
const path = require('path');
const request = require('request');

require('dotenv').config();

// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

// Route
app.get('/', (req, res)=> {
    res.redirect('search');
})

app.get('/results', (req, res) => {
    let query = req.query.search;
    let myAPIKey = process.env.MYAPIKEY;

    request(`https://api.themoviedb.org/3/search/movie?api_key=${myAPIKey}&query=${query}`, (err, response, body) => {
        if (err) console.log(err);

        let data = JSON.parse(body);
        res.render('movies', { data, searchQuery: query });
    });
});

app.get('/search', (req, res) => {
    res.render('search');
});


// Setup Port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});