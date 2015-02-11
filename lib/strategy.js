'use strict';

var util = require('util');
var OAuth2Strategy = require('passport-oauth2');
var request = require('request');

function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://accounts.automatic.com/oauth/authorize';
  options.tokenURL = options.tokenURL || 'https://accounts.automatic.com/oauth/access_token';
  options.customHeaders = options.customHeaders || {};
  options.scopeSeparator = options.scopeSeparator || ' ';

  if(!options.customHeaders['User-Agent']) {
    options.customHeaders['User-Agent'] = options.userAgent || 'passport-automatic';
  }

  OAuth2Strategy.call(this, options, verify);
  this.name = 'automatic';
  this._userProfileURL = options.userProfileURL || 'https://api.automatic.com/user/me';
}


util.inherits(Strategy, OAuth2Strategy);


Strategy.prototype.userProfile = function(accessToken, done) {
  request.get({
    uri: this._userProfileURL,
    headers: {Authorization: 'bearer ' + accessToken},
    json: true
  }, function(err, r, body) {
    if (err) {
      return done(new InternalOAuthError('Failed to fetch user profile', err));
    }

    var profile = body;
    profile.provider  = 'automatic';

    done(null, profile);
  });
}

module.exports = Strategy;
