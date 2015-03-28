module.exports = {
    userExists: function(username, cb) {
        User.find().exec(function(err, users) {
            for(var i = 0; i < users.length; i++) {
                if(users[i].username === username) {
                    return cb(users[i]);
                }
            }
            cb(false);
        });
    },
    createUser: function(username, data, cb) {
        User.create({ username: username, data: data }).exec(function(err, user) {
            cb(user);
        });
    }
}