var bcrypt = require('bcrypt');

module.exports={
    tableName:'users',
    attributes:{
        username:{
            type:'string',
            required:true,
            unique:true
        },
        password:{
            type:'string',
            required:true
        },
        verified:{
            type:'boolean',
            defaultsTo:false
        },
        token:{
            type:'string'
        }
    },

    toJSON: function() {
        var obj = this.toObject();
        delete obj.password;
        delete obj.token;
        return obj;
    },

    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                }
                else{
                    user.password = hash;
                    cb(null, user);
                }
            });
        });
    }
}