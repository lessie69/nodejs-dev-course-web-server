const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.ip} ${req.method} ${req.url}`;
  var logFile = 'server.log'
  console.log(log);
  fs.appendFile(logFile, log + '\r\n', (err) => {
    if (err) {
      console.log(`Unable to append to ${logFile}`)
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Maintenance'
  })
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear() 
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello, welcome to this page.',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad Request'
  })
});

app.listen(3000, () => {
  console.log('Server up and listening')
});