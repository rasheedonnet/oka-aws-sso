
var AWS = require('aws-sdk');
var querystring = require("querystring");

const logLevels = {error: 4, warn: 3, info: 2, verbose: 1, debug: 0};

// get the current log level from the current environment if set, else set to info
const currLogLevel = process.env.LOG_LEVEL != null ? process.env.LOG_LEVEL : 'info';

// print the log statement, only if the requested log level is greater than the current log level
function log(logLevel, statement) {
    if(logLevels[logLevel] >= logLevels[currLogLevel] ) {
        console.log(statement);
    }
}

exports.handler = function(event, context, callback) {
    var samlResponse='';
    var cognitoidentity = new AWS.CognitoIdentity();
    var identityId = '';
    var identityPool = 'us-east-1:67b1a014-8c91-4ba7-897e-cccccccccccc';
    var idpArn = 'arn:aws:iam::111111229211:saml-provider/okta_serverlessapp1';
    var appRole = 'arn:aws:iam::111111229211:role/serverlessapp1_role';
    var samlRes = JSON.stringify(decodeURI(event.formparams));//event['body'];
    samlRes = samlRes.replace('SAMLResponse=','');
    samlRes = samlRes.replace('&RelayState=','');
    samlResponse = decodeURIComponent(samlRes);
    
    AWS.config.region = 'us-east-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identityPool,
    });
    console.log('Identity ID: ' + AWS.config.credentials.identityId);

   AWS.config.credentials.get(function(err){
        if (err) console.log(err, err.stack);
        else {
            console.log('Identity ID: ' + AWS.config.credentials.identityId);
            identityId = AWS.config.credentials.identityId;
            getSamlCredentials();
        }
    });
    
    function getSamlCredentials() {
        console.log(samlResponse);
        var Logins = {};
    	Logins[idpArn] = samlResponse;
    	var params = {
			IdentityId: identityId,
			CustomRoleArn: appRole,
			Logins
		};
        cognitoidentity.getCredentialsForIdentity(params, function(err, data) {
    		if (err) console.log(err, err.stack);
    		else {
    		    var tmpKey = querystring.stringify({key: data.Credentials.AccessKeyId});
    			var tmpSec = querystring.stringify({sec: data.Credentials.SecretKey});
    			var tmpToken = querystring.stringify({token: data.Credentials.SessionToken});
    			var redirectURL = process.env.REDIRECT_URL;
    			
                callback(null, {
                    location :  redirectURL + '?' + tmpKey  + '&' + tmpSec + '&' + tmpToken
                });
    		}
    	});
    }
};