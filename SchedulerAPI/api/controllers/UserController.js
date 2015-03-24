var Chance = require('chance');
var chance = new Chance();
var moment = require('moment');
var bcrypt = require('bcrypt');

module.exports={
    create:function(req,res){
        if(req.body.email.toLowerCase().indexOf("@exeter.edu") === -1){
            return res.send(400);
        }
        var token=chance.guid();
        if(!(req.body.password.length >= 6 && req.body.password.length <= 20)){
            return res.send(400);
        }
        User.find().exec(function(err, users){
            for(var i = 0; i < users.length; i++){
                if(users[i].username.toLowerCase() === req.body.email.toLowerCase()){
                    return res.badRequest('EMAIL_IN_USE');
                }
            }
            process();
        });
        function process(){
            User.create({
                username:req.body.email.toLowerCase(),
                password:req.body.password,
                verified:false,
                token:token
            }).exec(function(err){
                if(err){
                    res.send(500);
                }
                else{
                    EmailService.sendSignupEmail(req.body.email, token, function(){
                        res.send(200);
                    });
                }
            });

        }

    },
    resend:function(req,res){
        User.findOne({ username: req.body.username.toLowerCase() }, function(err, user) {
            if (err) {
                return res.serverError(err);
            }
            if (!user) {
                return res.badRequest();
            }
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (!result) {
                    res.badRequest();
                }
                else if(err) {
                    res.serverError(err);
                }
                else if(user.verified) {
                    res.badRequest("ALREADY_VERIFIED");
                }
                else {
                    EmailService.sendSignupEmail(user.username, user.token, function(){
                        res.ok();
                    });
                }
            });
        });

    },
    verify:function(req,res){
        User.findOne({ username: req.body.email.toLowerCase() }).exec(function(err, user){
            if(err) {
                res.serverError();
            }
            else if(user){
                if(user.token === req.body.token){
                    User.update({id:user.id}, {verified:true}).exec(function(err, user){
                        if(!err){
                            res.ok();
                        }
                        else {
                            res.serverError();
                        }
                    });
                }
            }
            else{
                res.badRequest();
            }
        });
    },
    getUser:function(req,res){
        User.findOne({id:req.user.id}).exec(function(err, user){
            res.json(user);
        });
    },
    forgotPasswordToken:function(req, res){
        var date=moment().add(1, 'days').toDate();
        User.findOne({ username: req.body.email.toLowerCase() }).exec(function(err, user){
            if(err || !user) {
                return res.serverError();
            }
            else if(user.token !== req.body.token) {
                return res.badRequest();
            }
            ForgotPasswordToken.find({ userId: user.id }).exec(function(err, tokens){
                if(err){
                    res.send(500);
                }
                else if(tokens){
                    ForgotPasswordToken.destroy({ userId: user.id }).exec(function(err){
                        if(err){
                            res.send(500);
                        }
                        else{
                            UserService.processForgotPasswordToken(user, date, function(response){
                                if(response) {
                                    res.ok();
                                }
                                else {
                                    res.serverError();
                                }
                            });
                        }
                    });
                }
                else {
                    UserService.processForgotPasswordToken(user, date, function(response){
                        if(response) {
                            res.ok();
                        }
                        else {
                            res.serverError();
                        }
                    });
                }
            });

        });
    },
    resetPassword: function(req,res) {
        if(!(req.body.password.length >=6 && req.body.password.length <= 20)){
            return res.badRequest();
        }
        ForgotPasswordToken.findOne({ token: req.body.token }).exec(function(err, token){
            if(!token || err) {
                return res.badRequest();
            }
            else if(new Date(token.expiryDate) < new Date()){
                ForgotPasswordToken.destroy({token:req.body.token}).exec(function(err){
                    return res.badRequest();
                });
            }
            else if(token.username != req.body.username.toLowerCase() ){
                return res.badRequest();
            }
            else {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        if (err) {
                            return res.serverError();
                        }
                        else {
                            User.update({ id: token.userId },{ password: hash }).exec(function(err, user) {
                                if(err) {
                                    return res.serverError();
                                }
                                else{
                                    ForgotPasswordToken.destroy({ id: token.id }).exec(function(err){
                                        return res.ok();
                                    });
                                }
                            });
                        }
                    });
                });
            }
        });
    },
    validForgotPasswordToken: function(req, res) {
        ForgotPasswordToken.findOne({ token: req.params.token }).exec(function(err, token){
            if(err) {
                return res.badRequest();   
            }
            else if(!token) {
                return res.badRequest();
            }
            else {
                if(new Date(token.expiryDate) < new Date()){
                    ForgotPasswordToken.destroy({ token: req.params.token}).exec(function(err){
                        return res.badRequest();
                    });
                }
                else {
                    return res.ok();
                }
            }
        });
    }
}