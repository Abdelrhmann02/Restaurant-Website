const bcrypt = require('bcrypt');
const UserDB = require('../models/UserModel');
const jwt = require('jsonwebtoken');

exports.login = function(req,res,next){

    let username = req.body.username;
    let password = req.body.password;

    UserDB.lookup(username,function(err,user){
        if(err){
            return res.status(401).send("error looking up user");
        }
        if(!user){
            return res.status(401).render('errors/UserNotFound',{'user': username});
        }

        bcrypt.compare(password,user.password,function(err,result){
            if(result){
                let payload = {username:username};
                let accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn: 86000});
                res.cookie("jwt",accessToken);
                next();
            }
            else
            { 
                return res.status(403).render('errors/password');
            }
        });
    });
};

exports.verify = function(req,res,next){
    let accessToken = req.cookies.jwt;
    if(!accessToken){
        return res.status(403).render('errors/access');
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err,data) =>{
        if(err)
        {
            return res.status(403).render('errors/access');
        }
        else{
            req.user = data.username
            next();
        }
    })
};

