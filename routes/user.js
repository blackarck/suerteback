const router = require('express').Router();
const mysql = require('mysql');
const dotenv = require('dotenv');
const dbhelper = require('./dbhelper');
var connection = dbhelper.getconnection();
dotenv.config();

router.post('/login',(req,res)=>{

    console.log("Received user data from front end " + JSON.stringify(req.body));
});



module.exports = router;