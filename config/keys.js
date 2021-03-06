//require('dotenv').config();
module.exports = {

    env: process.env.NODE_ENV || 'development',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 5000,

    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    dbUrl: process.env.DATABASE_URL,

    apiKey: process.env.API_KEY,
    jwtKey: process.env.JWT_KEY,

    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS

};