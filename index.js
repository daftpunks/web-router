// env
require('dotenv').config()
// express
const path = require('path');
const express = require('express');
const proxy = require("express-http-proxy");
const app = express();
// koa
const koa = require('koa')
const router = require('koa-router')
const serve = ('koa-static')
// makes distribution folder servable
app.use(express.static(__dirname + "/distribution/"));
app.use(express.static(__dirname + "/clients/"));

// routes everything after /s to seach app and client side routing takes over.

app.get('/s/*', (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, '/distribution/search/index.html'));
});

app.get('/s/*', (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, '/distribution/search/index.html'));
});
  app.get('/a/*', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(path.join(__dirname, '/distribution/account/index.html'))
  })

  // listing resolver
  app.use("/l/home-for-sale/*/:id", proxy("localhost:44320", {
      proxyReqPathResolver: function(req) {
        const pathArray = req.baseUrl.split('/')
        const id = req.params.id
        const newPath = req.path + pathArray[2] + '/' + pathArray[3] + '/' + id
        return newPath
      }
    })
  );
 // corporate resolver
    app.use('/c/*', proxy('https://www-homie-dev.azurewebsites.net/', {
        proxyReqPathResolver: function(req) {
          const pathArray = req.baseUrl.split('/')
          const newPath = req.path + pathArray[2]
          return newPath
        }
      })
    )

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/distribution/static/404.html"));
});


app.listen(3000, () => console.log('server running'));
