const { user } = require('../models/user');

const updateUserValid = (req, res, next) => {  
    const { email, phoneNumber, firstName, lastName, password } = req.body
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;

    if (user.email && user.phoneNumber && user.firstName && user.lastName && user.password) {
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValidEmail= emailReg.test(String(user.email).toLowerCase()) && user.email.indexOf('@gmail.com') !== -1
        const isValidPhoneNumber = user.phoneNumber.startsWith('+380');


        if(req.body.id){
            res.body = res.status(400).json({
                error: true,
                message: "remove id in the body"
            })
        }

        if (isValidEmail && isValidPhoneNumber) {

            req.body = {
                email: user.email, 
                phoneNumber: user.phoneNumber, 
                firstName: user.firstName, 
                lastName: user.lastName, 
                password: user.password
            }
            next();
        } else {
            res.body = res.status(400).json({
                error: true,
                message: "Email or phone number is not valid"
            })
            next(res.body);
        }
    }else{
        res.body = res.status(400).json({
            error: true,
            message: "User is not valid"
        })
        next(res.body);
    }
}
exports.updateUserValid = updateUserValid;