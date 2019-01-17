module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://admin:hong97@ds159164.mlab.com:59164/customer_api',
    JWT_SECRET: process.env.JWT_SECRET || 'secret1'
};