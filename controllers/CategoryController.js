const categoryTbl = require('../models/categoryTbl');

const category = (req,res)=>{
    return res.render('addCategory');
}

module.exports = {
    category,
}