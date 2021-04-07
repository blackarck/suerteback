let jwt = require('jsonwebtoken');
const config = require('./config.js');
const admin = require('firebase-admin');
let userid = "";
let email = "";
let photourl = "";
let usrname = "";
let signinp = "";

var serviceAccount = require("../encryption/lottofbadminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase


    if (token) {
        //written by vivek start
        admin
            .auth()
            .verifyIdToken(token)
            .then((decodedToken) => {
                userdata = decodedToken;
                /* console.log("Decoded token is " + JSON.stringify(decodedToken));
                 userid = decodedToken.uid;
                 email = decodedToken.email;
                 photourl = decodedToken.picture;
                 usrname = decodedToken.name;
                 signinp = decodedToken.firebase.sign_in_provider;
                
                 console.log("Uid returned is " + userid);
                 */
                next();
            })
            .catch((error) => {
                console.log("Not able to decode the token ALERT-" + error);
            });
        //end of token by vivek end
        //console.log("Token is present " + token);

    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

let getuserdata = () => {
    return userdata;
}

module.exports = {
    checkToken: checkToken,
    getuserdata: getuserdata
}