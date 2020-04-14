const express = require('express')
const 
const app = express()
const axios = require('axios');

const urlToGetLinkedInAccessToken = 'https://www.linkedin.com/oauth/v2/accessToken';

app.get('/login', function (req, res) {
  // First get access token

  // Then get user's profile

  // After that, get user's email address

  // Finally, send response
})

/**
 * Get access token from LinkedIn
 * @param {*} code returned from step 1
 * @returns accessToken if successful or null if request fails 
 */
function getAccessToken(code) {
  let accessToken = null;
  const config = {
    headers: { "Content-Type": 'application/x-www-form-urlencoded' }
  };
  const parameters = {
    "grant_type": "authorization_code",
    "code": code,
    "redirect_uri": process.env.REDIRECT_URI,
    "client_id": process.env.CLIENT_ID,
    "client_secret": process.env.CLIENT_SECRET,
  };

  axios
    .post(
      urlToGetLinkedInAccessToken,
      qs.stringify(parameters),
      config)
    .then(response => {
      accessToken = response.data["access_token"];
    })
    .catch(err => {
      console.log("Error getting LinkedIn access token:");
      console.log(err.body);
    })
    return accessToken;
}

function getUserInformation(accessToken) {
  // Make request to get user's full name and profile image URL
}

function getUserEmailAddress(accessToken) {
  // Make request to get user's email address
}



app.listen(3000, function () {
  console.log(`Node server running...`)
});