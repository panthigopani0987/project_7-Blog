const Admintbl = require('../models/AdminTbl');

const profile = (req, res) => {
    return res.render('profile');
}

const updateProfile = async(req,res) =>{
    try{
        const {updateId,name,email,password} = req.body;
        let profileChange = await Admintbl.findById(updateId);
        if(profileChange)
        {
            let updatedata = await Admintbl.findByIdAndUpdate(updateId,{
                name : name,
                email : email,
                password : password
            });
            if(updatedata){
                console.log("Successfully Update Your Profile");
                return res.redirect('back');
            }
            else{
                console.log('Not Update Your Profile');
                return false;
            }
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    profile,
    updateProfile,
}