const helpers = { } ;
helpers.isAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg' , 'Error de autenticacion');
    res.redirect('/users/signin');
};

module.exports =  helpers;