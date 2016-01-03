var Chance = require('chance');
var chance = new Chance();
var moment = require('moment');
var bcrypt = require('bcrypt');

module.exports = {
    getUser: function(req,res) {
        User.findOne({ id: req.user.id }).exec(function(err, user){
            res.json(user);
        });
    }
}
