// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311
require('dotenv').config();

import axios from "axios"
const {
    KLARNA_API_KEY,
    KLARNA_PASSWORD,
    KLARNA_SHOP_URL
} = process.env;
export async function handler(event, context) {
    const {
        id
    } = event.queryStringParameters;
    try {
        const response = await axios.get(`https://${KLARNA_API_KEY}:${KLARNA_PASSWORD}@${KLARNA_SHOP_URL}/admin/api/2020-07/customers/${id}.json`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        const data = response.data
        return {
            statusCode: 200,
            body: JSON.stringify({
                shopify: data
            })
        }
    } catch (err) {
        console.log(err) // output to netlify function log
        return {
            statusCode: 500,
            body: JSON.stringify({
                shopify: err.message
            }) // Could be a custom message or object i.e. JSON.stringify(err)
        }
    }
}