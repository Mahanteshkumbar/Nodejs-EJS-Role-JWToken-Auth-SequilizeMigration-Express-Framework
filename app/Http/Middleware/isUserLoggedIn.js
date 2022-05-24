module.exports = (req,resp,next) => {
    let accessToken = req.cookies.jwt;
    if(accessToken  || req.session.email){
        return resp.redirect('/home');
    }
    next();
}