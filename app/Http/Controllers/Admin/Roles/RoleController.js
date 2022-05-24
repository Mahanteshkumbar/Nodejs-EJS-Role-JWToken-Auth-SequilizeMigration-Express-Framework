const db = require('../../../../../models');
const { validationResult } = require('express-validator');

exports.index = async (req, resp, next) => {
    await db.Role.findAll()
    .then((result) => {
        resp.render('dashboard/admin/role/index',{
            roleList: result,
            pageTitle: 'Roles'
        });        
    })
    .catch(error => {
        throw new Error(error);
    });
} 

exports.create = (req, resp, next) =>{
    resp.render('dashboard/admin/role/create',{
        pageTitle: 'Roles'
        
    });
}

exports.edit = async (req, resp, next) =>{
    let roles = await db.Role.findAll()
                .then( (roles) =>{
                    return roles;
                });
    await db.Role.findByPk(req.params.id)
    .then((result) => {
        resp.render('dashboard/admin/role/edit',{
            role: result,
            roleList: roles,
            pageTitle: 'Roles'
        });  
    })
    .catch(() => {
        throw new Error(error);
    });
}

exports.store = (req, resp, next) =>{
    db.Role.create(req.body)
    .then(() => {
        req.flash('success', `New Role added ${ req.body.name } successfully!`);
        resp.status(200).redirect('/roles');
    })
    .catch(() => {
        throw new Error(error);
    });
}

exports.update = (req, resp, next) =>{
    db.Role.update(req.body,{
        where: {
            id: req.params.id
        }
    })
    .then( result => {        
        req.flash('warning', `Role updated ${ req.body.name } successfully!`)
        resp.status(200).redirect('/roles');
    })
    .catch(error => {
        throw new Error(error);
    })
}

exports.delete = async (req, resp, next) =>{
    await db.Role.destroy({
        where: {
            id: req.params.id
        }
    })
    .then( () => {      
        req.flash('warning', `Role deleted successfully!`);        
        resp.status(200).redirect('/roles');
    })
    .catch(error => {
        throw new Error(error);
    })
}