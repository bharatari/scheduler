var bcrypt = require('bcrypt');

module.exports={
    tableName:'users',
    attributes:{
        username:{
            type:'string',
            required:true,
            unique:true
        },
        isAdmin:{
            type:'boolean'
        },
        data:{
            type:'array'
        }
    }
}