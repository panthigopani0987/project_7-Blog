const categoryTbl = require('../models/categoryTbl');

const subcategoryTbl = require('../models/subCategoryTbl');

const exsubcategoryTbl = require('../models/extraSubCategoryTbl');

const productTbl = require('../models/productTbl');

const fs = require('fs');

const product = async(req,res)=>{
    try{
        let category = await categoryTbl.find({});

        let subcategory = await subcategoryTbl.find({});

        let exsubcategory = await exsubcategoryTbl.find({});

        return res.render('product',{
            category,
            subcategory,
            exsubcategory,
            singleProduct : ""
        });
    }catch(err)
    {
        console.log(err);
        return false;
    }
}

const viewProduct = async(req,res) =>{
    try {
        let category = await categoryTbl.find({});

        let subcategory = await subcategoryTbl.find({});

        let exsubcategory = await exsubcategoryTbl.find({});

        let productdata = await productTbl.find({}).populate('categoryId').populate('subcategoryId').populate('exsubcategoryId');

        if (productdata) {
            return res.render('viewProduct', {
                productdata,
            })
        }
        else {
            console.log("Record Not Fetch");
            return false
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
            return false
        }
    }
}

const productdata = async(req,res)=>{
    try{
        const{UpdateId,category,subcategory,exsubcategory,pName,pPrice,pQty,pDesc} = req.body;
        if (UpdateId) {
            if (req.file) {
                if (!category || !subcategory || !exsubcategory || !pName || !pPrice || !pQty || !pDesc) {
                    console.log("Please Fill The Data");
                    return res.redirect('/')
                }
                let deleteImg = await productTbl.findById(UpdateId);
                if (deleteImg) {
                    fs.unlinkSync(deleteImg.image)
                }
                else {
                    console.log("Image Not Delete");
                    return false
                }
                let image = "";
                if(req.file){
                    image = req.file.path
                }
                let updatedata = await productTbl.findByIdAndUpdate(UpdateId,{
                    categoryId : category,
                    subcategoryId : subcategory,
                    exsubcategoryId : exsubcategory,
                    pName : pName,
                    pPrice : pPrice,
                    pQty : pQty,
                    pDesc : pDesc,
                    image : image
                })
                if(updatedata){
                    console.log("Data Is Updated");
                    return res.redirect('/viewProduct')
                }
                else {
                    console.log("Data Is Not Updated");
                    return false
                }
            }
            else {
                image = "";
                let singleProduct = await productTbl.findById(UpdateId);
                if(singleProduct){
                    image = singleProduct.image;
                    let updatedata = await productTbl.findByIdAndUpdate(UpdateId,{
                        categoryId : category,
                        subcategoryId : subcategory,
                        exsubcategoryId : exsubcategory,
                        pName : pName,
                        pPrice : pPrice,
                        pQty : pQty,
                        pDesc : pDesc,
                        image : image
                    })
                    if(updatedata){
                        console.log("Data Is Updated");
                        return res.redirect('/viewProduct')
                    }
                    else {
                        console.log("Data is Not Updated");
                        return false
                    }
                }
            }
        }
        else {
            if (!category || !subcategory || !exsubcategory || !pName || !pPrice || !pQty || !pDesc ) {
                console.log("Please Fill The Data");
                return res.redirect('/')
            }
            let image = "";
            if (req.file) {
                image = req.file.path
            }
            let productAdd = await productTbl.create({
                categoryId : category,
                subcategoryId : subcategory,
                exsubcategoryId : exsubcategory,
                pName : pName,
                pPrice : pPrice,
                pQty : pQty,
                pDesc : pDesc,
                image : image
            });
            if (productAdd) {
                console.log("Product Successfully Created");
                return res.redirect('/viewProduct');
            }
            else {
                console.log(err);
                return res.redirect('back');
            }
        }
    }
    catch(err)
    {
        console.log(err);
        return false;
    }
}


const deleteProduct = async (req, res) => {
    try {
        let id = req.query.id
        let deleteImg = await productTbl.findById(id);
        if (deleteImg) {
            fs.unlinkSync(deleteImg.image)
        }
        else {
            console.log("Image Is Not Remove");
            return false
        }
        let dltdata = await productTbl.findByIdAndDelete(id);
        if (dltdata) {
            console.log("Data Is Successfully Deleted");
            return res.redirect('back');
        }
        else {
            console.log("Data Is not Deleted");
            return res.redirect('back');
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
            return false;
        }
    }
}

const updateProduct = async (req, res) => {
    try {
        let id = req.query.id;

        let category = await categoryTbl.find({});

        let subcategory = await subcategoryTbl.find({});

        let exsubcategory = await exsubcategoryTbl.find({});

        let productdata = await productTbl.findById(id).populate('categoryId').populate('subcategoryId').populate('exsubcategoryId');

        return res.render('product', {
            singleProduct : productdata,
            category,
            subcategory,
            exsubcategory
        })
    }
    catch (err) {
        if (err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = {
    product,
    viewProduct,
    productdata,
    deleteProduct,
    updateProduct
}