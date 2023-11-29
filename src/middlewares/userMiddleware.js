const jwt = require('jsonwebtoken');
//JWT (Json web Token) es una libraría que permite generar tokens para autenticación de usuarios
const userMiddleware = (req,res,next) => {
    let token = req.header('Authorization')
    if(token) {
        token = token.split(' ')[1]
        /*verifica el token que se recibe en el header de la solicitud para ver si es válido
        Si es válido el token se ejecuta el controlador que se llama dentro de la ruta
        */
        jwt.verify(token, process.env.APP_JWT_SECRET_USER,(err, user) => {    
            if (err) return res.sendStatus(403)
            req.user = user
            next() 
        })
    } else {
        res.sendStatus(401)
    }
} 

module.exports = userMiddleware