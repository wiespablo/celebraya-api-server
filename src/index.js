require("dotenv").config();
require('./database');
const path = require('path');
const express = require("express");
const app = express();
const PORT = process.env.APP_PORT || 6595
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
//settings - 
//********************************* */
//***********Middleware************
//******************************** */
//este metodo permite que cuando un usuario me entrega determinado dato yo pueda entenderlo
//por ejemplo al registrarse cuando envíe su mail y contraseña
//es extended false, porque no acepta imágenes solo datos
app.use(bodyParser.urlencoded({extended: false}));

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


//en este punto concateno con la carpeta views, para que la pueda encontrar
app.set('views', path.join(__dirname, 'views'));

//seguidamente doy objetos de configuración con sus propiedades, 
//estas nos permiten saber de qué forma vamos a utilizar las vistas
app.engine('.hbs', exphbs =>({ 
    defaultLayout:'home' ,
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    //archivo layouts donde voy a tener el home, que es donde están las conf generales de la pagina
    layoutsDir: path.join(app.get('views'), 'layouts'),
    //partials son pequeñas partes de html que podems usar en varias vistas, acá establezco dirección
    partialsDir: path.join(app.get('views'), 'partials'),
    //sirve para colocar qué extensión que van a tener nuestros archivos de handlebars
    extname:'.hbs'
    //helpers: require('./lib/handlebars')
}) );
//anteriormente se configuró, ahora se utiliza meidante la siguiente linea
app.set('view engine', '.hbs');

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
