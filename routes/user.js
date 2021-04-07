const router = require('express').Router();
const mysql = require('mysql');
const dotenv = require('dotenv');
const dbhelper = require('./dbhelper');
const middleware = require('./middleware');
var connection = dbhelper.getconnection();

dotenv.config();

router.post('/login', middleware.checkToken, (req, res) => {
    console.log("Received user data from front end " + JSON.stringify(middleware.getuserdata()));
});



module.exports = router;