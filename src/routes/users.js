const router = require ('express').Router();
const User =  require('../models/User');
const passport = require('passport');


router.get('/users/signIn', ((req, res) => {
    res.render('users/signin');
}));

router.get('/users/signUp', ((req, res) => {
    res.render('users/signup');
}));

router.post('/users/signup' ,  (async (req, res) => {

    const { name, password , email, ConfirmPassword } = req.body;
    const errors = [];
    if(name.length == 0 )
        errors.push({text: 'Por favor ingrese un nombre'});
    if(email.length == 0 )
        errors.push({text: 'Por favor ingrese un mail '});
    if(password != ConfirmPassword)
        errors.push({text: 'Contrasenia incorrecta'});
    if(password.length < 4)
        errors.push({text: 'La contrasenia debe contener almenos 4 digitos'});

    if(errors.length > 0)
    {
        res.render('users/signup' , {errors, name , password, ConfirmPassword, email});
    }
    else {
       const EmailUser = await User.findOne({email: email});
       if(EmailUser){
           req.flash('errors_msg', 'El email ya esta en uso');
           res.redirect('/users/signup');
       }
       const newUser = new User({name, email, password});
       newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Estas registrado!');
        res.redirect('/users/signin');
    }
}));

router.post('/users/signin' , passport.authenticate('local' , {

    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true


}));

router.get('/users/logout', (req,res) =>{
   req.logout();
   res.redirect('/users/signin');
});

module.exports = router;