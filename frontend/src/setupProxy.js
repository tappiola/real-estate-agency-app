const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/graphql',
        createProxyMiddleware({
            target: process.env.BACKEND_URL || 'http://localhost:5000',
            changeOrigin: true,
        })
    );
};
