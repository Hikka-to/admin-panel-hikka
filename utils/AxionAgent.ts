const axios = require('axios');
const https = require('https');

export const axiosAgent = new https.Agent({
 rejectUnauthorized: false,
});