const nedb = require('nedb');

class Menu{
    
    constructor(dbFilePath){
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

    GetAvailableLunch(){
        return new Promise((resolve,reject) => {
            this.db.find({'Category': 'Lunch', 'Availability': true}, function(err,entries){
                if(err){
                    reject(err);
                }
                else{
                    resolve(entries);                }
            })
        })
    }

    GetAvailableDinner(){
        return new Promise((resolve,reject) => {
            this.db.find({'Category': 'Dinner', 'Availability': true}, function(err,entries){
                if(err){
                    reject(err);
                }
                else{
                    resolve(entries);                }
            })
        })
    }
}

module.exports = Menu;