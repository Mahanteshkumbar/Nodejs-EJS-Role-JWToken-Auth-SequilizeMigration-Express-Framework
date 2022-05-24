const db = require('../../../models');

exports.usersByRoles = async function(id){
  return await db.User.findAll({
    include: {
      model: db.Role,
      as: 'roles'
    }
  })
  .then(result => {
    return result.map((user) => { 
      return {
        id:user.id, 
        name: user.name, 
        email: user.email,
        roles: user.roles.map((roles) => {
                  return roles.name;
               })
      }
    });    
  }); 
}


