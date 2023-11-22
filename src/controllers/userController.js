const userController = {};
require('dotenv');
const User = require("../models/user");
const jwt = require('jsonwebtoken');



userController.index = async (req, res) =>{
    console.log("entro a index - eventos");
    res.sendFile('/public/index.html');
}

userController.usersAll = async (req, res) =>{
    try {
        const users = await User.find();
        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.sendStatus(204);
        }

    } catch (error) {
       res.sendStatus(409); 
    }
}
userController.register = async (req, res) => {
    try {
        const valid = await User.findOne({email: req.body.email});
        if (!valid) {
            const user = await new User(req.body);             
            await user.save();
           // sendMail(user.email, 'Registro exitoso', ${req.protocol + '://' + req.get('Host')}, 'token', 'user','registro.html');
            
            res.status(201).json(user);
            
        } else {
            res.status(409).json("Ya se encuentra Registrado");  
        }
    } catch (e) {
        res.sendStatus(409);
    }
}
userController.login = async (req, res) => {
    try {
        console.log(process.env.APP_JWT_SECRET_USER);
        const user = await User.findOne({ email: req.body.email }).exec()
        if (user) {    
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err) { throw err };
                if (isMatch) {
                    let payload = {
                        _id: user._id,
                        nombre: user.nombre,
                        email: user.email,
                        direccion: user.direccion,
                        telefono: user.telefono,
                        
                    }
                    if(req.query.modeApp){
                        const token = jwt.sign(payload, process.env.APP_JWT_SECRET_USER)
                        res.status(200).json({ ...payload, token })
                    }else{
                        const token = jwt.sign(payload, process.env.APP_JWT_SECRET_USER, { expiresIn: '8h' })
                        res.status(200).json({ ...payload, token })
                    }
                }
                else res.sendStatus(404);
            });
        } else res.sendStatus(204);
    } catch (e) {
        console.log(e);
        res.sendStatus(409)
    }
}

module.exports = userController;
