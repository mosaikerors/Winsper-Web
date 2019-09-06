const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://202.120.40.8:30525/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }))
};