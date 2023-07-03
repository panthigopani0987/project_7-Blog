const categoryTbl = require('../models/categoryTbl');

const category = async(req,res)=>{
    try{
        let cateData = await categoryTbl.find({});
        if(cateData)
        {
            return res.render('addCategory',{
                cateData,
                singleData : "",
            });
        }
        else{
            console.log('Record Not Fetch');
        }
    }catch(err)
    {
        console.log(err);
        return false;
    }
}

const category_add = async(req,res) =>{
    try{
        const {updateId,name,detail} = req.body;
        if(updateId)
        {
            if(!name || !detail)
            {
                console.log('Please Enter All Data in The Field');
                return res.redirect('back');
            }
            let singleData = await categoryTbl.findById(updateId);
            if(singleData)
            {
                let updateData = await categoryTbl.findByIdAndUpdate(updateId,{
                    name : name,
                    detail : detail
                });
                if(updateData)
                {
                    console.log(('Data Is Update'));
                    return res.redirect('/addCategory');
                }
                else
                {
                    console.log('Data Is Update');
                    return false;
                }
            }
        }
        else{
            if(!name || !detail)
            {
                console.log('Please Enter All Data in The Field');
                return res.redirect('back');
            }
            let cate = await categoryTbl.create({
                name : name,
                detail : detail
            });
            if(cate)
            {
                console.log('Data Successfully Insert');
                return res.redirect('/addCategory');
            }
            else{
                console.log(err);
                return res.redirect('back');
            }
        }
    }catch(err)
    {
        console.log(err);
        return false;
    }
}

const deleteCate = async(req,res)=>{
    try{
        let id = req.query.id;
        let cateDelt = await categoryTbl.findByIdAndDelete(id);
        if(cateDelt)
        {
            console.log('Category Is Successfully Delete');
            return res.redirect('/addCategory');
        }
        else{
            console.log('Category Is Not Remove');
            return res.redirect('back');
        }
    }catch(err)
    {
        console.log(err);
        return false;
    }
}
const updateCate = async(req,res) =>{
    try{
        let id = req.query.id;
        let singleData = await categoryTbl.findById(id);
        let AllData = await categoryTbl.find({});
        if(singleData)
        {
            return res.render('addCategory',{
                singleData,
                cateData : AllData
            });
        }
        else{
            console.log('Record Is Not Fetch');
            return false;
        }
    }catch(err)
    {
        console.log(err);
        return false;
    }
}

module.exports = {
    category,
    category_add,
    deleteCate,
    updateCate
}