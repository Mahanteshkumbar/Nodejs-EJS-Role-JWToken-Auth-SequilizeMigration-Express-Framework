class ValidateRoleMiddleware{
  static validateRole(role) {
    console.log("validateRole",role);
    return async (req, res, next) => {
      //try {
        console.log("rolesss",role,req.session.roles[0],req.session.roles.includes(role));
        if(req.session.roles.includes(role)){
          console.log("rolss",role);
          return next();
        }else{
          return res.status(401).render('errors/401',{
            errorMessage: "401 Unauthorized Access!!"
          });
        }        
      // } catch (error) {
      //    throw new Error(401);
      // }      
    }
  }
}
module.exports = ValidateRoleMiddleware;