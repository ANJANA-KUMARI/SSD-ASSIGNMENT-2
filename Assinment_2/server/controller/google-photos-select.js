const { OAuth2Client } = require('google-auth-library');
const credentials = require('../client_secret.json');
const { google } = require('googleapis');
const { file } = require('googleapis/build/src/apis/file');

const client = new OAuth2Client("128644511689-1sdmau2gitdj3mbtms7g0s67lh6g75h6.apps.googleusercontent.com");

const SCOPES = ['https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly'];

const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);


exports.googleLogin = (req, res) => {
  const { tokenId } = req.body;

  client.verifyIdToken({ idToken: tokenId, audience: "128644511689-1sdmau2gitdj3mbtms7g0s67lh6g75h6.apps.googleusercontent.com" }).then(response => {
      const { email_verified, name, email } = response.payload;
      console.log(response.payload);
      if(email_verified) {
      } else {
      }
  })
    console.log(tokenId);  
}

exports.getGoogleAuthUrl = (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log(authUrl);
  res.send(authUrl);
}

exports.getGoogleToken = (req, res) => {
  if(req.body.code === null) {
    return res.status(400).send('Invalid Request');
  } 
  oAuth2Client.getToken(req.body.code, (err, token) => {
    if(err) {
      console.error('Error from access token', err);
      return res.status(400).send('Error from access token');
    }
    res.send(token);
  });
}

exports.readGoogleDrive = (req, res) => {
  if(req.body.token === null) {
    return res.status(400).send('Token not found');
  }
  oAuth2Client.setCredentials(req.body.token);
  const drive = google.drive({
    version: 'v3',
    auth: oAuth2Client,
  });
  drive.files.list({
    pageSize: 50,
  }, (err, response) => {
    if(err) {
      console.log('The API returned an error: ' + err);
      return res.status(400).send(err);
    }
    const files = response.data.files;
    if(file.length) {
      console.log("Files: ");
      files.map((file) => {
        console.log(`${file.name} (${file.id})`);
      })
    } else {
      console.log('No files found');
    }
    res.send(files);
  });
}

exports.downloadGooglePhotos = (req, res) => {
  if(req.body.token === null) {
    return res.status(400).send('Token not found');
  }
  oAuth2Client.setCredentials(req.body.token);
  const drive = google.drive({
    version: 'v3',
    auth: oAuth2Client
  });
  let filedID = req.params.id;
  drive.files.get({
    fileId: filedID, 
    alt: 'media'
  }).on('end', function () {
    console.log('Done');
  }).on('error', function (err) {
    console.log('Error during download', err);
  }).pipe(res);
}

// , 
// {
//   responseType: 'stream'
// },
// function(err, response) {
//   console.log("Error: ", err);
//   response.data.on('end', () => {
//     console.log('Done');
//   }).on('error', err => {
//     console.log('Error', err);
//   }).pipe(res);
// };







