exports.merge = require('utils-merge');

/**
 * Reconstructs the original URL of the request.
 *
 * This function builds a URL that corresponds the original URL requested by the
 * client, including the protocol (http or https) and host.
 *
 * If the request passed through any proxies that terminate SSL, the
 * `X-Forwarded-Proto` header is used to detect if the request was encrypted to
 * the proxy, assuming that the proxy has been flagged as trusted.
 *
 * @param {http.IncomingMessage} req
 * @param {Object} [options]
 * @return {String}
 * @api private
 */
exports.originalURL = function(req, options) {
  options = options || {};
  var app = req.app;
  if (app && app.get && app.get('trust proxy')) {
    options.proxy = true;
  }
  var trustProxy = options.proxy;
  
  var proto = (req.headers['x-forwarded-proto'] || '').toLowerCase()
    , host = (trustProxy && req.headers['x-forwarded-host']) || req.headers.host
    , path = req.url || '';
  return 'https://' + host + path;
};
