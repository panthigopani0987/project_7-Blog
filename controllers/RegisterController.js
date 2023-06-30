const AdminTbl = require('../models/AdminTbl');

const register = (req, res) => {
    return res.render('register')
}

const registerData = async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body
        if (password == cpassword) {
            let userdata = await AdminTbl.create({
                name: name,
                email: email,
                password: password
            })
            if (userdata) {
                console.log("Data is Successfully Create");
                return res.redirect('/')
            }
            else {
                console.log("Data is Not Create");
                return res.redirect('back')
            }
        }
        else {
            console.log("Password and Confirm Password Is Not Match");
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

module.exports = {
    register,
    registerData,
}