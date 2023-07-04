const mongoose = require('mongoose')

const categoryschema = mongoose.Schema({
    name : {
        type : String,
        require : true
    }
})

const Category = mongoose.model('Category',categoryschema);

module.exports = Category;