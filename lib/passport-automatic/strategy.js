'use strict';

var util = require('util');
var OAuth2Strategy = require('passport-oauth2');


// "accessTokenURL": "https://www.automatic.com/oauth/access_token",
// "requestTokenURL": "https://www.automatic.com/oauth/request_token",
// "authTokenURL": "https://www.automatic.com/oauth/authorize",

function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://www.automatic.com/oauth/authorize';
  options.tokenURL = options.tokenURL || 'https://www.automatic.com/oauth/access_token';
  options.customHeaders = options.customHeaders || {};

  OAuth2Strategy.call(this, options, verify);
  this.name = 'automatic';
  this._oauth2.useAuthorizationHeaderforGET(true);
}


util.inherits(Strategy, OAuth2Strategy);


Strategy.prototype.userProfile = function(accessToken, done) {
  setTimeout(function(){
    done(null, {provider: 'automatic'});
  }, 0);
};

module.exports = Strategy;
