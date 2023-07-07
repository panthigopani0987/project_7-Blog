const mongoose = require("mongoose")

const subschema = mongoose.Schema({
    categoryId : {
        type : mongoose.Types.ObjectId,
        ref : 'Category'
    },
    subcategory : {
        type : String,
        required : true
    }
})

const crud = mongoose.model('subcategory',subschema);

module.exports = crud;
