const fetch = require('node-fetch');
const faunadb = require('faunadb');
const q = faunadb.query;
const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_USER_ID, FAUNA_SECRET, TOKEN_REF } = process.env;

const API_ENDPOINT = 'https://www.strava.com/api/v3';

const client = new faunadb.Client({ secret: FAUNA_SECRET });

const refreshToken = async () => {
  console.log('refreshing token...');

  // Retrieving the Strava Refresh Token from FaunaDB
  const token = await client.query(q.Get(q.Ref(q.Collection('tokens'), TOKEN_REF)));

  // Calling the Strava API to refresh the expired token
  const response = await fetch(
    `https://www.strava.com/oauth/token?client_id=${STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}&refresh_token=${token.data.refresh_token}&grant_type=refresh_token`,
    {
      method: 'POST',
    }
  );

  // Parsing the response
  const data = await response.json();

  // Return an error if something went wrong
  if (data.errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(data),
    };
  }

  // Updating the token in FaunaDB with the new token
  await client.query(q.Update(q.Ref(q.Collection('tokens'), TOKEN_REF), { data }));

  // Fetching the data from Strava
  return getStravaStats(data.access_token);
};

const getStravaStats = async (access_token) => {
  console.log('Getting Strava Stats...');

  // Calling the Strava API for my personal stats
  return fetch(`${API_ENDPOINT}/athletes/${STRAVA_USER_ID}/stats`, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify(data),
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};

exports.handler = async (event, context) => {
  // Getting the current timestamp in seconds
  const currentTime = Math.floor(Date.now() / 1000);

  // Retrieving the Strava Refresh Token from FaunaDB
  const token = await client.query(q.Get(q.Ref(q.Collection('tokens'), TOKEN_REF)));

  console.log('Exporting Handler...');

  // Checking if the token stored in the DB is expired
  if (currentTime >= token.data.expires_at) {
    // Refreshing the token if it is expired
    return refreshToken();
  } else {
    // Directly fetching the stats if it's not
    return getStravaStats(token.data.access_token);
  }
};
