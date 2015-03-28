var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('pTw4E8DYFKb696f5YzXmzg');

module.exports = {
    sendSignupEmail: function(firstName, lastName, email, token, cb) {
        var message={
            "html":"<h1>Welcome to Scheduler!</h1><p>Before you can login to your account, you're going to need to verify your email address. Go to https://www.domain.com/app/verify and enter the following token: <strong>"+token.toString()+"</strong>. This is only a one-time verification process. Once you're done, you are good to go! </p>",
            "subject":"Verify your email address",
            "from_email":"swyftdeveloper@outlook.com",
            "from_name":"Scheduler",
            "to":[{
                "email":email,
                "type":"to"
            }]
        };
        mandrill_client.messages.send({ "message": message }, function(result) {            
            cb();
        });
    }
}