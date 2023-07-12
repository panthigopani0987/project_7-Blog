const categoryTbl = require('../models/categoryTbl');

const subcategoryTbl = require('../models/subCategoryTbl');

const add_SubCategory = async(req,res)=>{
    try{
        let category = await categoryTbl.find({});

        let submergeTbl = await subcategoryTbl.find({}).populate('categoryId');

        return res.render('add_SubCategory',{
            category,
            submergeTbl
        });
    }catch(err)
    {
        console.log(err);
        return false;
    }
}

const postSubcategory = async(req,res)=>{
    try {
        const {category,subcategory} = req.body
        let addSubcategory = await subcategoryTbl .create({
            categoryId : category,
            subcategory : subcategory
        })
        if(addSubcategory){
            console.log("Subcategory Add Successfully");
            return res.redirect('back')
        }
        else{
            console.log("Subcategory Not Add");
            return res.redirect('back')
        }
    } 
    catch (err) {
        return false
    }
}

const updateSubCate = async(req,res)=>{
    try {
        
        let id = req.query.id;
        let category = await categoryTbl.find({});

        let subcategoryupdate = await subcategoryTbl.findById(id).populate('categoryId');
        
        return res.render('subcateupdate',{
            singleSubData : subcategoryupdate, 
            category
        })

    } catch (error) {
        console.log(error);
        return false;
    }
}

const postupdateSubcategory = async(req,res) => {

    try{
        const {updateId,subcategory} = req.body
        let updateData = await subcategoryTbl.findByIdAndUpdate(updateId,{
            subcategory :subcategory,
        })
        if(updateData)
        {
            console.log('Sub Category Update');
            return res.redirect('/add_SubCategory');
        }
        else{
            console.log('Sub Category Not Update');
            return false;
        }
    }catch(err)
    {
        console.log(err);
        return false;
    }

}

module.exports = {
    add_SubCategory,
    postSubcategory,
    updateSubCate,
    postupdateSubcategory
}