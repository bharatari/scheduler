var bcrypt = require('bcrypt');
var moment = require('moment');
var jwt = require('jwt-simple');

module.exports={
    login: function(req, res) {
        DataService.retrieveSchedule(req.body.username, req.body.password, function(result) {
            if(!result) {
                return res.serverError();
            }
            else {
                DataService.processHTML(result, function(processed) {
                    UserService.userExists(req.body.username, function(exists) {
                        if(!exists) {
                            UserService.createUser(req.body.username, processed, function(user) {
                                process(processed, user);
                            });
                        }
                        else {
                            User.update({ id: exists.id }, { data: processed }).exec(function(err) {
                                process(processed, exists);
                            });
                        }
                    });
                });
            }
        });
        
        function process(data, user) {
            DataService.processUserPeriods(data, user.id, function() {
                login(user);
            });
        }
        
        function login(user) {
            var expires = moment().add(2, 'days').toDate();
            var authToken = jwt.encode({
                iss: user.id,
                exp: expires
            }, AuthService.jwtTokenSecret);

            LoginToken.create({ token:authToken, expires: expires, userId: user.id }).exec(function(err, token){
                if(err) {
                    return res.serverError(err);
                }
                else {
                    if(token) {
                        return res.ok({
                            token : token,
                            expires: expires,
                            user: user.toJSON()
                        });                    
                    }
                    else {
                        return res.serverError();
                    }
                }
            });
        }
    },
    logout: function(req,res) {
        LoginToken.destroy({ userId: req.body.userId }).exec(function(err) {
            if(err) {
                res.serverError(err);
            }
            else {
                res.ok();
            }
        });
    },
    isAuthenticated: function(req,res) {
        AuthService.authenticated(req.query.tokenId, function(response) {
            if(response) {
                AuthService.getUser(response.token, function(user) {
                    if(user) {
                        res.ok();
                    }
                    else {
                        return res.forbidden();
                    }
                });
                return res.ok();
            }
            else {
                return res.forbidden();
            }
        });
    }
}