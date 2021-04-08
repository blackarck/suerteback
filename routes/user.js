const router = require('express').Router();
const mysql = require('mysql');
const dotenv = require('dotenv');
const dbhelper = require('./dbhelper');
const middleware = require('./middleware');
var connection = dbhelper.getconnection();

dotenv.config();

router.post('/login', middleware.checkToken, (req, res) => {
    const userData = middleware.getUserData();
    //console.log("Received user data from front end " + JSON.stringify(userData));
    isUserExist(userData.uid).then(result => {
        if (result.exists) {
            console.log("User already exists");
            //return last 10 tickets the user has purchased
            res.json({
                success: true,
                usrexist: true,
                usrcreated: false
            });
        } else {
            //insert user in table
            createUser(userData).then(result => {
                if (result.status) {
                    console.log("User Created successfully");
                    res.json({
                        success: true,
                        usrexist: false,
                        usrcreated: true

                    });
                } else {
                    console.log("User creation error return false");
                    res.json({
                        success: true,
                        usrexist: false,
                        usrcreated: false

                    });
                }
            }); //end of create user
        } //end of else for user exists
    }); //end of isUserExists
}); //end of login hyperlink

const isUserExist = (userid) => {
        return new Promise((resolve, reject) => {

            //run a query in user and figure out whether user exists or not
            var stmt = "select  userid from userdtl where userid=?";
            connection.query(stmt, [userid], function(err, rows, fields) {
                if (err) {
                    console.log("DB Error in /login/isuserexists :" + err);
                } else {
                    if (rows.length > 0) {
                        //data already present
                        resolve({ exists: true, });
                    } else {
                        resolve({ exists: false, });
                    } //end of else
                } //end of else
            }); //end of query execution
        }); //end of promise
    } //end of function isuserecxists

const createUser = (userdata) => {
        return new Promise((resolve, reject) => {

            var stmt = "insert into `userdtl` (`userid`, `email`, `name`, `photourl`, `signinprov`) values (?,?,?,?,?)";
            connection.query(stmt, [userdata.uid, userdata.email, userdata.name, userdata.picture, userdata.firebase.sign_in_provider], function(err, rows, fields) {
                if (err) {
                    console.log("DB Error in insert /login/createuser :" + err);
                } else {
                    resolve({ status: true })
                } //end of else
            }); //end of insert query 
        }); //end of promise
    } //end of function createUser

module.exports = router;