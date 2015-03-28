var bcrypt = require('bcrypt');

module.exports={
    tableName:'users',
    attributes:{
        username:{
            type:'string',
            required:true,
            unique:true
        },
        data:{
            type:'array'
        }
    }
}