const blogtbl = require('../models/blogtbl');

const fs = require('fs')

const dashboard = (req, res) => {
    return res.render('dashboard')
}

const login = (req, res) => {
    if (res.locals.users) {
        return res.redirect('/dashboard')
    }
    return res.render('login');
}

const loginData = (req, res) => {
    return res.redirect('/dashboard')
}

const logout = (req, res) => {
    req.logout((err) => {
        console.log(err);
        return false
    })
    return res.redirect('/');
}

const addblog = (req, res) => {
    return res.render('addblog', {
        single: ""
    })
}

const insertdata = async (req, res) => {
    try {
        const { editid, name, discription } = req.body
        if (editid) {
            if (req.file) {
                if (!name || !discription) {
                    console.log("Please Fill The Data");
                    return res.redirect('/')
                }
                let deleteImg = await blogtbl.findById(editid)
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
                let updatedata = await blogtbl.findByIdAndUpdate(editid,{
                    name : name,
                    discription : discription,
                    image : image
                })
                if(updatedata){
                    console.log("Data Is Updated");
                    return res.redirect('/viewblog')
                }
                else {
                    console.log("Data Is Not Updated");
                    return false
                }
            }
            else {
                image = "";
                let singledata = await blogtbl.findById(editid);
                if(singledata){
                    image = singledata.image;
                    let updatedata = await blogtbl.findByIdAndUpdate(editid,{
                        name : name,
                        discription : discription,
                        image : image
                    })
                    if(updatedata){
                        console.log("Data Is Updated");
                        return res.redirect('/viewblog')
                    }
                    else {
                        console.log("Data is Not Updated");
                        return false
                    }
                }
            }
        }
        else {
            if (!name || !discription) {
                console.log("Please Fill The Data");
                return res.redirect('/')
            }
            let image = "";
            if (req.file) {
                image = req.file.path
            }
            let data = await blogtbl.create({
                name: name,
                discription: discription,
                image: image
            })
            if (data) {
                console.log("Data Successfully Created");
                return res.redirect('/viewblog');
            }
            else {
                console.log(err);
                return res.redirect('back');
            }
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
            return false
        }
    }
}

const viewblog = async (req, res) => {
    try {
        let blogdata = await blogtbl.find({});
        if (blogdata) {
            return res.render('viewblog', {
                blogdata
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

const deletedata = async (req, res) => {
    try {
        let id = req.query.id
        let deleteImg = await blogtbl.findById(id)
        if (deleteImg) {
            fs.unlinkSync(deleteImg.image)
        }
        else {
            console.log("Image Is Not Remove");
            return false
        }
        let dltdata = await blogtbl.findByIdAndDelete(id)
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

const editdata = async (req, res) => {
    try {
        let id = req.query.id;
        let single = await blogtbl.findById(id)
        if (single) {
            return res.render('addblog', {
                single
            })
        }
        else {
            console.log("Record Is Not Fetch");
            return false;
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = {
    login,
    logout,
    loginData,
    dashboard,
    insertdata,
    addblog,
    viewblog,
    editdata,
    deletedata,
    
}