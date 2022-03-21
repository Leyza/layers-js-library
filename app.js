/* server.js - Express server*/
'use strict';
const log = console.log
log('Express server')

const express = require('express')
const app = express();

const path = require('path');

app.use('/', express.static(path.join(__dirname, '/pub')))

const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})

app.get('/', (req, res) => {
	res.send('<h1>Go to https://layers-js-library.herokuapp.com/pub/example.html</h1>')
})

// Error codes
app.get('/problem', (req, res) => {
	res.status(500).send('There was a problem on the server')
})
