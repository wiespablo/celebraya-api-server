require("dotenv").config();
require('./database');
const express = require("express");
const app = express();
const PORT = process.env.APP_PORT || 6595
const routes = require('./routes/routes');

app.use('/api/admin',routes);




app.listen(PORT, (err,ok) =>{   
    if (err){
        console.log("error de servidor");      
    }
    console.log(`aplicacion corriendo en el puerto ${PORT}`);
});
module.exports
