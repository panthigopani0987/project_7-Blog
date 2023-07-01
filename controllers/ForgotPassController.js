const AdminTbl = require('../models/AdminTbl');

const nodemailer = require('nodemailer');

const ForgotPass = (req,res) => {
    return res.render('ForgotPass');
}

const forgotemail = async(req,res) =>{
    try{
        const forgotemail = req.body.forgotemail;
        let checkEmail = await AdminTbl.findOne({email : forgotemail});
        if(checkEmail)
        {
            const transporter = nodemailer.createTransport({
                service : 'gmail',
                auth : {
                    user :'panthigopani1234@gmail.com',
                    pass : 'ivecpcvosyficjfi'
                }
            });
            const generateOTP = () => {
                const digits = '0123456789';
                let OTP = '';
                for(let i = 0; i < 6;i++)
                {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                return OTP;
            }
            const sendOTP = (recipientEmail) =>{
                const OTP = generateOTP();
                
                const mailOption = {
                    from :'panthigopani1234@gmail.com',
                    to : forgotemail,
                    subject : 'One Time Password (OTP)',
                    text :  `Your OTP Is : ${OTP}`
                }
                transporter.sendMail(mailOption,(error,info)=>{
                    if(error)
                    {
                        console.log(error);
                    }
                    else{
                        let obj = {
                            OTP : OTP,
                            email : forgotemail
                        }
                        res.cookie('userOTP',obj);
                        console.log('Email Sent : '+info.response);
                        return res.redirect('/OTP');
                    }
                })
            }
            const recipientEmail = forgotemail;
            sendOTP(recipientEmail);
        }
        else{
            return res.redirect('back');
        }
    }catch(err)
    {
        console.log(err);
        return false;
    }
}

module.exports = {
    ForgotPass,
    forgotemail
}