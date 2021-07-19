const fetch = require('node-fetch');
const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN, STRAVA_ACCESS_TOKEN, STRAVA_USER_ID, STRAVA_EXPIRES_AT } = process.env;

const API_ENDPOINT = 'https://www.strava.com/api/v3/';

const refreshToken = async () => {
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
  return fetch(`${API_ENDPOINT}/athletes/${STRAVA_USER_ID}/stats`, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: data,
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};

exports.handler = async (event, context) => {
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime >= STRAVA_EXPIRES_AT) {
    return refreshToken();
  } else {
    return getStravaStats(STRAVA_ACCESS_TOKEN);
  }
};
