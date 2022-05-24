const db = require('../../../../../models');
const roles = require('../../../Helper/UserRolesHelperFunctions');
const { validationResult } = require('express-validator');

exports.index = async (req,res,next) => {  
    // console.log(await roles.usersByRoles());
    try {
        res.render('dashboard/admin/user/index',{
            users:  await roles.usersByRoles(),
            pageTitle: "Home Page"
        });
    } catch (error) {
        return next(error);
    } 
}

exports.create = async (req, res, next) => {
    //res.sendFile(path.join(__dirname,'../','views','user','create.html'));   
    await db.Role.findAll()
        .then( (roles) =>{
            return roles;
        })
        .then( (roles) =>{
            res.render('dashboard/admin/user/create',{
            pageTitle: "Add User",
            errorMessage: null,
            roles: roles
        });    
    });
}

exports.edit = async (req, res, next) => {
    let roles = await db.Role.findAll()
                .then( (roles) =>{
                    return roles;
                });
    await db.User.findByPk(req.params.id,{
        include: {
          model: db.Role,
          as: 'roles'
        }
      })
        .then((result) => {            
            console.log(roles);
            // .then( (roles,result) =>{
                res.render('dashboard/admin/user/edit',{
                pageTitle: "Add User",
                errorMessage: null,
                user: result,
                role: result.roles.map((roles) => {
                    return roles.name;
                 }),
                roleList: roles
            // });    
            });
    })
    .catch(err => {
        throw new Error(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });   
}

exports.store = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('dashboard/admin/user/create',{
            pageTitle: "Add User",
            errorMessage: errors.array(),
            roles:  await db.Role.findAll()
        });
    }

    await db.User.create(req.body)
    .then((user) => {
        db.UserHasRole.create({
            UserId: user.id,
            RoleId: req.body.role
        });

        req.flash('success', `New User added ${ req.body.name } successfully!`);
        res.status(200).redirect('/users');

    })
    .catch((err) => {
        throw new Error(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}

exports.update = (req,res,next) => {
    db.User.update(req.body,{
        where: {
            id: req.params.id
        }
    })
    .then((result) => {
        req.flash('success', `User update ${ req.body.name } successfully!`);
        res.status(200).redirect('/users');
    })
    .catch(err =>{
        throw new Error(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });    
}

exports.delete = (req,res,next) => {
    db.User.destroy({
        where:{
            id: req.params.id
        }    
    })
    .then(() => {
        req.flash('success', `User deleted successfully!`);
        res.status(200).redirect('/users');
    })
    .catch(err => {
        throw new Error(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }); 
}

