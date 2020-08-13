const express = require ('express');
const router = express.Router();
const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');


router.get('/notes/add', isAuthenticated ,(req, res) => {
    res.render('notes/new-notes');
});

router.post('/notes/new-notes' , isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if(!title)
    {
        errors.push({text: 'Please write the title'});
    }
    if(!description)
    {
        errors.push({text: 'Please insert description'});
    }
    if(errors.length>0)
    {
        res.render('notes/new-notes', { errors, title, description });
    }
    else {
        const NewNote = new Note ({ title, description });
        NewNote.user = req.user.id;
        await NewNote.save();
        req.flash('success_msg', 'Nota guardada con exito');
        res.redirect('/notes');
    }

});
router.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await Note.find({user: req.user.id}).sort({date:  'desc'});

    res.render('notes/all-notes.hbs', { notes } );
});

router.get ('/notes/edit/:id', isAuthenticated, async (req,res) =>{
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-notes' , {note});
});

router.put('/notes/edit-notes/:id' , isAuthenticated ,async (req, res) => {
    const {title,description} = req.body;
   await Note.findByIdAndUpdate(req.params.id, {title,description});
   req.flash('success_msg' , 'Editado con exito');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async  (req,res) =>
{
    await    Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg' , 'Eliminado con exito');

    res.redirect('/notes');
});

module.exports = router;