const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require("../../../../models");

exports.index = (req, resp, next) =>{
    return resp.render('front-end/auth/register',{
        errorMessage : []
    });
}

exports.register = async (req, resp, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(422).render('front-end/auth/register',{
            errorMessage: errors.array()
        });
        //return resp.status(400).json({ errors: errors.array() });
    }

    await bcrypt.hash(req.body.password,12)
    .then(passwordHash => {
        db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: passwordHash
        })
        .then((result) => {  
                db.UserHasRole.create({
                    UserId: result.id,
                    RoleId: 2
                });
                req.session.username = result.name;
                req.session.email = result.email;
                req.session.auth = true;
                req.session.role = 'user';

                let payload = {
                    auth: true,
                    name: result.name,
                    email: result.email
                };

                let accessToken = jwt.sign(payload, 'longest secreate key node admin', {
                    algorithm: "HS256",
                    expiresIn: '1h'
                });
            
                // console.log("accessToken",accessToken);
                
                resp.cookie("jwt", accessToken, {secure: true, httpOnly: true, samesite:"lax"});
                return resp.redirect('/home');
        })
        .catch(error => {
            throw new Error(error);
        });       
    })
    .catch(error => {
        throw new Error(error);
    });  
}