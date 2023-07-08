const mongoose = require("mongoose")

const subschema = mongoose.Schema({
    categoryId : {
        type : mongoose.Types.ObjectId,
        ref : 'Category'
    },
    subCategoryId : {
        type : mongoose.Types.ObjectId,
        ref : 'subcategory'
    },
    exsubcategory : {
        type : String,
        required : true
    }
})

const crud = mongoose.model('exsubcategory',subschema);

module.exports = crud;
