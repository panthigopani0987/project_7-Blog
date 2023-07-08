const categoryTbl = require('../models/categoryTbl');

const subcategoryTbl = require('../models/subCategoryTbl');

const exsubcategoryTbl = require('../models/extraSubCategoryTbl');

const ExSubCategory = async(req,res) =>{
    try {
        let category = await categoryTbl.find({});

        let subcategory = await subcategoryTbl.find({});

        let mergeexsubcategory = await exsubcategoryTbl.find({}).populate('categoryId').populate('subCategoryId');

        return res.render('ExSubCategory',{
            category,
            subcategory,
            mergeexsubcategory
        })
    } catch (err) 
    {
        console.log(err);
        return false;
    }
}

const postExSubcategory = async(req,res)=>{
    try {
        const {category,subcategory,exsubcategory} = req.body;
        let ExtraSubCategory = await exsubcategoryTbl.create({
            categoryId : category,
            subCategoryId : subcategory,
            exsubcategory : exsubcategory
        });
        if(ExtraSubCategory)
        {
            console.log('Extra Sub Category Create Sucessfully');
            return res.redirect('back');
        }
        else{
            console.log('Extra Sub Category Not Create');
            return res.redirect('back');
        }
    } 
    catch (err) {
        return false
    }
}

module.exports = {
    ExSubCategory,
    postExSubcategory
}