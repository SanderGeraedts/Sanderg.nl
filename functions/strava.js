const fetch = require('node-fetch');
const faunadb = require('faunadb');
const q = faunadb.query;
const { STRAVA_CLIENT_ID, STRAVA_REFRESH_TOKEN, STRAVA_CLIENT_SECRET, STRAVA_USER_ID, FAUNA_SECRET } = process.env;

const API_ENDPOINT = 'https://www.strava.com/api/v3';

const client = new faunadb.Client({ secret: FAUNA_SECRET });

const refreshToken = async () => {
  return fetch(
    `https://www.strava.com/oauth/token?client_id=${STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}&refresh_token=${STRAVA_REFRESH_TOKEN}&grant_type=refresh_token`,
    {
      method: 'POST',
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.errors) {
        return {
          statusCode: 500,
          body: JSON.stringify(data),
        };
      }

      const result = await client.query(
        q.Create(q.Collection('tokens'), {
          data,
        })
      );

      console.log(result);

      getStravaStats(data.access_token);
    })
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};

const getStravaStats = async (access_token) => {
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
  const STRAVA_EXPIRES_AT = Math.floor(Date.now() / 1000) - 10;
  console.log('Exporting Handler...');
  console.log(`Current time: ${currentTime}`);
  console.log(`Strava Expires: ${STRAVA_EXPIRES_AT}`);
  if (currentTime >= STRAVA_EXPIRES_AT) {
    console.log('refreshing token...');
    return refreshToken();
  } else {
    console.log('Getting Strava Stats...');
    return getStravaStats(STRAVA_ACCESS_TOKEN);
  }
};
