exports.home = (req, resp, next) =>{
    return resp.render('dashboard/layout/index');
}

exports.welcome = (req, resp, next) => {
   return resp.render('front-end/layout/index')
}