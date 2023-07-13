const mongoose = require('mongoose')

const crudschema = mongoose.Schema({
    categoryId : {
        type : mongoose.Types.ObjectId,
        ref : 'Category'
    },
    subcategoryId : {
        type :mongoose.Types.ObjectId,
        ref : 'subcategory'
    },
    exsubcategoryId : {
        type :mongoose.Types.ObjectId,
        ref : 'exsubcategory'
    },
    pName : {
        type : String,
        required : true
    },
    pPrice : {
        type : String,
        required : true
    },
    pQty : {
        type : String,
        required : true
    },
    pDesc : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    }
});

const crud = mongoose.model('product',crudschema);

module.exports = crud;