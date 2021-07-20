const fetch = require('node-fetch');
const faunadb = require('faunadb');
const q = faunadb.query;
const { STRAVA_CLIENT_ID, STRAVA_REFRESH_TOKEN, STRAVA_CLIENT_SECRET, STRAVA_USER_ID, FAUNA_SECRET, TOKEN_REF } = process.env;

const API_ENDPOINT = 'https://www.strava.com/api/v3';

const client = new faunadb.Client({ secret: FAUNA_SECRET });

const refreshToken = async () => {
  console.log('refreshing token...');

  const response = await fetch(
    `https://www.strava.com/oauth/token?client_id=${STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}&refresh_token=${STRAVA_REFRESH_TOKEN}&grant_type=refresh_token`,
    {
      method: 'POST',
    }
  );
  const data = await response.json();
  if (data.errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(data),
    };
  }

  await client.query(q.Update(q.Ref(q.Collection('tokens'), TOKEN_REF), { data }));

  return getStravaStats(data.access_token);
};

const getStravaStats = async (access_token) => {
  console.log('Getting Strava Stats...');

  const url = `${API_ENDPOINT}/athletes/${STRAVA_USER_ID}/stats`;

  console.log(`Calling ${url}...`);

  return fetch(`${API_ENDPOINT}/athletes/${STRAVA_USER_ID}/stats`, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify(data),
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};

exports.handler = async (event, context) => {
  const currentTime = Math.floor(Date.now() / 1000);

  const token = await client.query(q.Get(q.Ref(q.Collection('tokens'), TOKEN_REF)));

  console.log('Exporting Handler...');
  console.log(`Current time: ${currentTime}`);
  console.log(`Strava Expires: ${token.expires_at}`);
  if (currentTime >= token.expires_at) {
    return refreshToken();
  } else {
    return getStravaStats(token.access_token);
  }
};
