const fs = require('fs');
const path = require('path');
const nocache = require('nocache');
const express = require('express');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const timeout = require('connect-timeout');
const bodyParser = require('body-parser');


const app = express();
app.use(timeout(5000));
app.use(nocache());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/../client/'));

app.use(sessions({
    secret: 'secretkey',
    saveUninitialized:true,
    cookie: {maxAge: 1000*60*60*24*30},
    resave: false
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.get('/play',(req,res)=>{
    const id = req.query.play;
    if (fs.existsSync(__dirname+'/../client/vids/'+id)){
        fs.readdir(__dirname+'/../client/vids/'+id, ((err, files) => {
            res.send(JSON.stringify({exist: true, count: files.length}));
        }))
    }else{
        res.send(JSON.stringify({exist: false}));
    }
})


app.listen(22700, function (){
    console.log('Listening on Port 22700');
})