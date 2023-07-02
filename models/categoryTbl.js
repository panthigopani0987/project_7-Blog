const mongoose = require('mongoose')

const categoryschema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    price : {
        type : String,
        require : true
    },
    quantity : {
        type : String,
        require : true
    },
    detail : {
        type : String,
        require : true
    }
})

const Category = mongoose.model('Category',categoryschema);

module.exports = Category;