const fetch = require('node-fetch');
const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN, STRAVA_ACCESS_TOKEN, STRAVA_USER_ID, STRAVA_EXPIRES_AT } = process.env;

const API_ENDPOINT = 'https://www.strava.com/api/v3';

const refreshToken = async () => {
  const url = `${API_ENDPOINT}/oauth/token`;

  console.log(`Calling ${url}...`);
  return fetch(`${API_ENDPOINT}/oauth/token`, {
    headers: {
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: STRAVA_REFRESH_TOKEN,
    },
    method: 'POST',
  })
    .then((response) => response.json())
    .then((data) => {
      process.env.STRAVA_ACCESS_TOKEN = data.access_token;
      process.env.STRAVA_EXPIRES_AT = data.expires_at;
      process.env.STRAVA_REFRESH_TOKEN = data.refresh_token;
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
