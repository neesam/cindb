const mongoose = require('mongoose');
//This will create a database named "product" if one doesn't already exist (no need for mongo shell!):



mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
    .then(() => console.log(`Connected to the ${process.env.DB_NAME} database`))
    .catch(err => console.log("Something went wrong when connecting to the database", err));





