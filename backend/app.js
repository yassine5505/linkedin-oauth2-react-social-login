const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(cors());

// Constand
const urlToGetLinkedInAccessToken = 'https://www.linkedin.com/oauth/v2/accessToken';
const urlToGetUserProfile ='https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))'
const urlToGetUserEmail = 'https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))';

app.get('/login', function (req, res) {
  const user = {};
  const accessToken = getAccessToken(code);
  const userProfile = getUserProfile(accessToken);
  const userEmail = getUserEmail(accessToken);
  user = userBuilder(userProfile, userEmail);
  const resStatus = (!accessToken || !userProfile || !userEmail) ? 400 : 200;
  res.status(resStatus).json({ user });
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

function getUserProfile(accessToken) {
  const userProfile = null;
  const config = {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  }
  axios
    .get(urlToGetUserProfile, config)
    .then(response => {
      userProfile.firstName = response.data["localizedFirstName"];
      userProfile.lastName = response.data["localizedLastName"];
      userProfile.profileImageURL = response.data.profilePicture["displayImage~"].elements[0].identifiers[0].identifier;
      // I mean, couldn't they have burried it any deeper?
    })
    .catch(error => {
      userProfile = null;
    })
  return userProfile;
}

function getUserEmail(accessToken) {
  const email = null;
  const config = {
    headers: {
      "Authorization": `Bearer ${urlToGetUserProfile}`
    }
  };
  axios
    .get(urlToGetUserEmail, config)
    .then(response => {
      email = response.data.elements[0]["handle~"];
    })
    .catch(error => error)

  return email;
}

/**
 * Build User object
 */
function userBuilder(userProfile, userEmail) {
  return {
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    profileImageURL: userProfile.profileImageURL,
    email: userEmail
  }
}

app.listen(3000, function () {
  console.log(`Node server running...`)
});