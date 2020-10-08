const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const restify = require('restify');

/*
*   jctovar adaption 20201008
*
*/

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/admin.directory.user'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

var oauthAuth = [];

fs.readFile('credentials.json', (err, content) => {
  if (err) return console.error('Error loading client secret file', err);

  credentials = JSON.parse(content);

  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oauth2Client, callback);

    oauth2Client.credentials = JSON.parse(token);
    oauthAuth = oauth2Client;
  });
});

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oauth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) return console.warn(`Token not stored to ${TOKEN_PATH}`, err);
    console.log(`Token stored to ${TOKEN_PATH}`);
  });
}

/**
 * Get a user for your email.
 *
 */
function getUser(req, res, next) {
  const auth = oauthAuth;
  const service = google.admin({version: 'directory_v1', auth});

  service.users.get({
    userKey: req.params.email,
  }, (error, response) => {
    if(error) return res.send({ "The API returned an error": error.message });

    res.header('content-type', 'json');
    res.charSet('utf-8');
    res.send(response.data);
    next();
  })
}

/**
 * Get a user photo.
 *
 */
function getPhoto(req, res, next) {
  const auth = oauthAuth;
  const service = google.admin({version: 'directory_v1', auth});

  service.users.photos.get({
    userKey: req.params.email,
  }, (error, response) => {
    if(error) return res.send({ "The API returned an error": error.message });

    res.header('content-type', 'json');
    res.charSet('utf-8');
    res.send(response.data);
    next();
  });
}

/**
 * Create a user account.
 *
 */
function insertUser(req, res, next) {
  const auth = oauthAuth;
  const service = google.admin({version: 'directory_v1', auth});

  const data = req.body;

  service.users.insert({
    "resource": {
      "name": {
        "familyName": data.lastName,
        "givenName": data.firstName
      },
      "password": data.password,
      "primaryEmail": data.primaryEmail,
      "changePasswordAtNextLogin": false,
      "recoveryEmail": data.recoveryEmail,
      "recoveryPhone": data.recoveryPhone,
      "emails": [
          {
            "address": data.recoveryEmail,
            "type": "home",
            "primary": false
          }
      ],
      "externalIds": [
          {
            "value": data.userId,
            "type": "organization"
          }
      ],
      "orgUnitPath": data.orgUnitPath
    }
  }, (error, response) => {
    if(error) return res.send({ "The API returned an error": error.message });

    res.header('content-type', 'json');
    res.charSet('utf-8');
    res.send(response.data);
    next();
  });
}

/**
 * Create a server for listen requests.
 *
 */
const server = restify.createServer({
  name: 'iztacala',
  version: '1.2.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/photo/:email', getPhoto);
server.get('/user/:email', getUser);

server.post('/insert/', insertUser);
 
server.listen(3006, function () {
  console.log('%s listening at %s', server.name, server.url);
});