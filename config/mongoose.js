const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/Blog_project_7');

const DB = mongoose.connection;

DB.on('connected',(err)=>{
    if(err){
        console.log(err);
        return false
    }
    console.log("DB Connected !!");
});