const bcrypt = require('bcrypt');
const UserDB = require('../models/UserModel');
const jwt = require('jsonwebtoken');

exports.login = function(req,res,next){

    let username = req.body.username;
    let password = req.body.password;

    UserDB.lookup(username,function(err,user){
        if(err){
            console.log("error looking up user",err);
            return res.status(401).send();
        }
        if(!user){
            console.log("user "+username+" not found");
            return res.status(401).send();
        }

        bcrypt.compare(password,user.password,function(err,result){
            if(result){
                let payload = {username:username};
                let accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn: 120});
                res.cookie("jwt",accessToken);
                next();
            }
            else
            { 
                return res.status(403).send();
            }
        });
    });
};

exports.verify = function(req,res,next){
    let accessToken = req.cookies.jwt;
    if(!accessToken){
        return res.status(403).send();
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err,data) =>{
        if(err)
        {
            res.status(403).send();
        }
        else{
        req.user = data.username
        next();
        }
    })
    
};

