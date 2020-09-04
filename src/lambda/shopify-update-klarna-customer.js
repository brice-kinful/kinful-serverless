require('dotenv').config();
const axios = require('axios');
const {
    KLARNA_API_KEY,
    KLARNA_PASSWORD,
    KLARNA_SHOP_URL
} = process.env;

//https://community.netlify.com/t/how-do-i-call-a-netlify-function-through-the-client-side-using-a-simple-function-invocation-like-netlifyfuction/1157/2


exports.handler = function (event, context, callback) {
    const {
        id,
        note
    } = event.queryStringParameters;
    const url = `https://${KLARNA_API_KEY}:${KLARNA_PASSWORD}@${KLARNA_SHOP_URL}/admin/api/2020-07/customers/${id}.json`;

    axios.put(url, note)
        .then(json => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(json.data)
            });
        })
        .catch(ex => callback(ex));
}