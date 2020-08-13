const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/notes-db-app' , {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
    allowedProtoMethods: true
})

    .then(db =>  console.log('db is connected'))
    .catch(err => console.error(err));