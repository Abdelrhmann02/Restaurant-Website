const nedb = require('nedb');
var alert = require("alert")

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
            this.db.find({'Category': 'Lunch', $or: [{ 'Availability': 'true' }, { 'Availability': true }]}, function(err,entries){
                if(err){
                    reject(err);
                }
                else{
                    resolve(entries);                }
            })
        })
    }
    GetAllLunch(){
        return new Promise((resolve,reject) => {
            this.db.find({'Category': 'Lunch'}, function(err,entries){
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
            this.db.find({'Category': 'Dinner', $or: [{ 'Availability': 'true' }, { 'Availability': true }]}, function(err,entries){
                if(err){
                    reject(err);
                }
                else{
                    resolve(entries);                }
            })
        })
    }
    
    GetAllDinner(){
        return new Promise((resolve,reject) => {
            this.db.find({'Category': 'Dinner'}, function(err,entries){
                if(err){
                    reject(err);
                }
                else{
                    resolve(entries);                }
            })
        })
    }

    GetAll(){
        return new Promise((resolve,reject) => {
            this.db.find({}, function(err,entries){
                if(err){
                    reject(err);
                }
                else{
                    resolve(entries);                }
            })
        })
    }

    search(id){
        return new Promise((resolve,reject) => {
            this.db.find({'_id': id}, function(err,entries){
                if(err){
                    reject(err);
                }
                else{
                    resolve(entries);                }
            })
        })
    }

    Delete(name){
        this.db.remove({'Name': name}, {}, function (err, numRemoved) {
            // numRemoved = 1
          });
    }

    addEntry(name,desc,ingred,allergy,cat,aval,price){
        var entry = {
            Name: name,
            Description: desc,
            Ingerdients: ingred.split(','),
            Allergy: allergy.split(','),
            Category: cat,
            Availability: aval === "true",
            price: price
        }
        this.db.insert(entry, function(err,doc) {
            if(err)
            {
                console.log("error inserting document",subject);
            }
            else{
                console.log('Meal Added Successfully');
            }
        })
    }

    UpdateEntry(id,name,desc,ingred,allergy,cat,aval,Price){
    var avaliable = aval === "true";
    this.db.update({ _id: id },
                   {$set:{ Name: name, Description: desc, Ingerdients: ingred, Allergy:allergy,Category:cat,Availability:avaliable,price: Price }},
                   {}, (err, done) => {
            if(err)
                console.log("Error")
            if(done)
                console.log("Updated Successfully")
          });
    }

}

module.exports = Menu;