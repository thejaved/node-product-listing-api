require('dotenv').config();

module.exports = {
    secret: process.env.SECRETKEYHERE,
    tokenExpiry: '1h', // Token expiry time
}; 