const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const http = require('http');
const session = require('express-session');
var MemoryStore = require('memorystore')(session)
const bodyParser = require('body-parser');
const userjs = require('./routes/user');



const cors = require('cors');
app.use(express.json());
app.use(cors({ origin: true }));

app.use('/api/user', userjs);


app.use(session({
    secret: 'the star wars family',
    resave: true,
    saveUninitialized: true
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  };

  const port = process.env.port || 8080;


if (process.env.NODE_ENV == "production") {
    http.createServer(app).listen(port, function() {
        console.log(`Server listening on port ${port}!`)
    });
} else {
    https.createServer({
            key: fs.readFileSync('./encryption/server.key'),
            cert: fs.readFileSync('./encryption/server.cert')
        }, app)
        .listen(port, function() {
            console.log(`suerte app listening on port ${port}!`)
        });
}