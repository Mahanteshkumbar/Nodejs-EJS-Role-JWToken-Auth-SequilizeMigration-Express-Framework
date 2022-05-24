const jwt = require('jsonwebtoken');

module.exports = async (req,resp,next) => {
    let accessToken = req.cookies.jwt;
    if(!accessToken || !req.session.email){
        await req.session.destroy();
        await resp.clearCookie("jwt");
        await resp.clearCookie("my-session-name");
        await resp.clearCookie("connect.sid");
        return resp.redirect('/login');
    }

    try {
        let isAuth = jwt.verify(accessToken,'longest secreate key node admin');
        if(!isAuth.auth){
            return resp.redirect('/login');    
        }
        next();    
    } catch (error) {
        await req.session.destroy();
        await resp.clearCookie("jwt");
        await resp.clearCookie("my-session-name");
        await resp.clearCookie("connect.sid");
        return resp.redirect('/login');
        //return resp.status(400).send('Invalid token !');
    }  
}