const express = require('express')
const 
const app = express()
const axios = require('axios');
const LinkedInApp = require('./config.js');

app.get('/login', function (req, res) {
  var code = req.body.code;
  // Making request to get access token
  
  // Making a second request to get user image, first and last names

  // Making a third one to get email address 
  // (since it requires a different scope)
})

app.listen(3000, function () {
  console.log(`Node server running...`)
});