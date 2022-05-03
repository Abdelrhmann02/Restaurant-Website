const nedb = require('nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserDB{

    constructor(dbFilePath) {
        if (dbFilePath)
        {
            this.db = new nedb({filename: dbFilePath, autoload: true});
            console.log("DB Connected to "+dbFilePath);
        }
        else
        {
            this.db = new nedb();
        }
    }
    
    create(username,password){
        const that= this;
        bcrypt.hash(password,saltRounds).then(function(hash){
            var entry = {
                user: username,
                password: hash,
            };
            that.db.insert(entry,function(err){
                if(err){
                    console.log("Can't insert user: ",username);
                }
            });
        });
    };

    lookup(user,cb){
        this.db.find({'user': user}, function(err,entries){
            if(err){
                return cb(null,null);
            } 
            else
            {
                if(entries.length == 0){
                    return cb(null,null);
                }
                return cb(null,entries[0]);
                
            }
        });
    }
}

const dao = new UserDB("user.db");

module.exports = dao;