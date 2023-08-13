// import requied modules

const path = require('path');
const html = require('express').Router();

// GET route that returns the notes.html file

html.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// GET route that returns the index.html file

html.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// exports fb

module.exports = html;