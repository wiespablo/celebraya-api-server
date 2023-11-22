require("dotenv").config();
require('./database');
const path = require('path');
const express = require("express");
const hbs = require('hbs');
const app = express();
const PORT = process.env.APP_PORT || 6595
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

//handlebars
app.set('view engine', 'hbs');
const filePathPartials = path.join(__dirname, '../views/partials');
console.log("Ruta completa de partials: ", filePathPartials);
hbs.registerPartials(filePathPartials);

//settings - 
//********************************* */
//***********Middleware************
//******************************** */
//este metodo permite que cuando un usuario me entrega determinado dato yo pueda entenderlo
//por ejemplo al registrarse cuando envíe su mail y contraseña
//es extended false, porque no acepta imágenes solo datos
app.use(bodyParser.urlencoded({extended: false}));
app.use( express.static('public'));
//con methodOverride los formularios pueden enviar ademas de get y post, también put y delete.
app.use(methodOverride('_method'));
app.use(session ({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

//servir contenido estático
app.use('/static', express.static(path.join(__dirname, 'public')));


app.get('/', (req, res)=>{
    const filePath = path.join(__dirname, '../views');
    console.log('Ruta completa: ', filePath);
    res.render('home',{
        titulo: 'CelebraYa!!',
        slogan: 'Un clic más cerca de la celebración perfecta.',
        bienvenida: 'Organizá tu evento'

    });
});
app.get('/elements', (req, res)=>{
    const filePath = path.join(__dirname, '../views',);
    console.log('Ruta completa: ', filePath);
    res.render('elements',{
        titulo: 'CelebraYa!!',
        slogan: 'Un clic más cerca de la celebración perfecta.',
        bienvenida: 'Organizá tu evento'

    });
});

app.get('/generic', (req, res)=>{
    const filePath = path.join(__dirname, '../views');
    console.log('Ruta completa: ', filePath);
    res.render('generic',{
        titulo: 'CelebraYa!!',
        slogan: 'Un clic más cerca de la celebración perfecta.',
        bienvenida: 'Organizá tu evento'
    });
});




//en este punto concateno con la carpeta views, para que la pueda encontrar
//app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, '../public'));


app.use('/api',routes);

//*************************** */
//*********Static Files****** */
//*************************** */
app.use(express.static(path.join(__dirname, 'public')));


//******************************* */
//*********Server Listening****** */
//****************************** */


app.listen(PORT, (err,ok) =>{   
    if (err){
        console.log("error de servidor");      
    }
    console.log(`aplicacion corriendo en el puerto ${PORT}`);
});
module.exports
