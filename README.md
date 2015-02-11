# Passport-Automatic

[Passport](http://passportjs.org/) strategy for authenticating with [Automatic](https://automatic.com/) using the OAuth 2.0 API.

This module lets you authenticate using Automatic in your Node.js applications.
By plugging into Passport, Automatic authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-automatic

## Usage

#### Configure Strategy

The Automatic authentication strategy authenticates users using a GitHub account
and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which accepts
these credentials and calls `done` providing a user, as well as `options`
specifying a client ID, client secret, and callback URL.

    passport.use(new AutomaticStrategy({
        clientID: AUTOMATIC_CLIENT_ID,
        clientSecret: AUTOMATIC_CLIENT_SECRET,
        scope: ['scope:user:profile', 'scope:trip', 'scope:location', 'scope:vehicle:profile', 'scope:vehicle:events', 'scope:behavior']
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ automaticId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'automatic'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/automatic',
      passport.authenticate('automatic'));

    app.get('/auth/automatic/callback',
      passport.authenticate('automatic', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

#### Get Access Token

Passport adds a `user` attribute to `req`, so you can get the access token with `req.user.accessToken`.

Example:

    //fetches most recent 25 trips
    request.get({
      uri: 'https://api.automatic.com/trip/',
      headers: {Authorization: 'bearer ' + req.user.accessToken},
      json: true
    }, function(e, r, body) {
      //body contains api response
    });

## Credits

  - [Brendan Nee](https://github.com/brendannee)
  - [Alisa "Cats" Palson](https://github.com/octoblu)
  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2015 Automatic
