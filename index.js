// env
require('dotenv').config()
// express
const path = require('path')
const express = require('express')
const app = express()

// makes distribution folder servable
app.use(express.static(__dirname + '/distribution/'))
app.use(express.static(__dirname + '/clients/'))

// routes everything after /s to seach app and client side routing takes over.

app.get('/s/*', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.sendFile(path.join(__dirname, '/distribution/search/index.html'))
})

app.get('/s/*', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.sendFile(path.join(__dirname, '/distribution/search/index.html'))
})
app.get('/a/*', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.sendFile(path.join(__dirname, '/distribution/account/index.html'))
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/distribution/static/404.html'))
})

app.listen(5555, () => console.log('server running .. hi ✋'))
