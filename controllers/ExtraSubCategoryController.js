const categoryTbl = require('../models/categoryTbl');

const subcategoryTbl = require('../models/subCategoryTbl');

const exsubcategoryTbl = require('../models/extraSubCategoryTbl');

const ExSubCategory = async (req, res) => {
    try {
        let category = await categoryTbl.find({});

        let subcategory = await subcategoryTbl.find({});

        let mergeexsubcategory = await exsubcategoryTbl.find({}).populate('categoryId').populate('subCategoryId');

        return res.render('ExSubCategory', {
            category,
            subcategory,
            mergeexsubcategory
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}

const postExSubcategory = async (req, res) => {
    try {
        const { category, subcategory, exsubcategory } = req.body;
        let ExtraSubCategory = await exsubcategoryTbl.create({
            categoryId: category,
            subCategoryId: subcategory,
            exsubcategory: exsubcategory
        });
        if (ExtraSubCategory) {
            console.log('Extra Sub Category Create Sucessfully');
            return res.redirect('back');
        }
        else {
            console.log('Extra Sub Category Not Create');
            return res.redirect('back');
        }
    }
    catch (err) {
        return false
    }
}

const updateExSubCate = async(req, res) => {
    try {
        let id = req.query.id;

        let category = await categoryTbl.find({});

        let subcategory = await subcategoryTbl.find({});

        let mergeexsubcategory = await exsubcategoryTbl.findById(id).populate('categoryId').populate('subCategoryId');

        return res.render('ExCateUpdate',{
            singleData : mergeexsubcategory,
            category,
            subcategory,
        });

    } catch (err) {
        console.log(err);
        return false;
    }
}

const postExSubcateUpdate = async(req,res) => {

    try{
        const {updateId,exsubcategory} = req.body
        let updateData = await exsubcategoryTbl.findByIdAndUpdate(updateId,{
            exsubcategory :exsubcategory,
        })
        if(updateData)
        {
            console.log('Extra Sub Category Update');
            return res.redirect('/ExSubCategory');
        }
        else{
            console.log('Extra Sub Category Not Update');
            return false;
        }
    }catch(err)
    {
        console.log(err);
        return false;
    }

}

module.exports = {
    ExSubCategory,
    postExSubcategory,
    updateExSubCate,
    postExSubcateUpdate
}