const jwt = require('jsonwebtoken');

const userMiddleware = (req,res,next) => {
    let token = req.header('Authorization')
    if(token) {
        token = token.split(' ')[1]
        jwt.verify(token, process.env.APP_JWT_SECRET_CUSTOMER,(err, user) => {
            if (err) return res.sendStatus(403)
            req.customer = user
            next() 
        })
    } else {
        res.sendStatus(401)
    }
} 

module.exports = userMiddleware