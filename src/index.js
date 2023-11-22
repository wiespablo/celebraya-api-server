require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.APP_PORT || 6595
const apiAdmin = require('./routes/api');

app.use('/api/admin',apiAdmin);




app.listen(PORT, (err,ok) =>{   
    if (err){
        console.log("error de servidor");      
    }
    console.log(`aplicacion corriendo en el puerto ${PORT}`);
});
module.exports
