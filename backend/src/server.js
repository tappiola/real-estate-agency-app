const express = require('express');

const app = express();

app.use('/properties', (req, res) => {
    res.send('properties');
});


app.use('/', (req, res) => {
    res.send('home koala');
});

app.listen(80);