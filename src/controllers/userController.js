const userController = {};
require('dotenv');
const User = require("../models/user");
const jwt = require('jsonwebtoken');

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

userController.updatePass = async (req, res) => {
    try{
        const user = await User.findById(req.user._id)
        if(user){
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err) { throw err };
                if (isMatch) {
                    const SALT_WORK_FACTOR = 10
                    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
                        if (err) return console.log('error salt:',err);
                        bcrypt.hash(req.body.newPassword.toString(), salt, async function(err, hash) {
                            if (err) return console.log('error hash:',err);
                            await User.findByIdAndUpdate(req.user._id, {password: hash})
                            res.sendStatus(202)
                        });
                    });
                }else{
                    res.sendStatus(400);
                }
            })
        }else{
            res.sendStatus(204)
        }
    }catch(e){
        console.log(e)
        res.sendStatus(409)
    }
}

userController.search = async ( req, res ) => {
    try {
        let option = {}
        option = typeof req.body.text == 'number' ?  {telefono: req.body.text} :  {email: req.body.text}
        const user = await User.findOne({ option }).exec();
        if (user) {
            res.status(200).json(user);
        } else {
            res.sendStatus(204);
        }
        
    } catch (error) {
        console.log(error);
        res.sendFile('/public/index.html');
    }

}

userController.invitaciones = async ( req, res ) => {
    try {
        const invitaciones = await invitacion.find({ usuario: req.user._id })
                .populate([{
                    path: 'evento',
                    model: 'Eventos',
                    select: 'fecha hora tematica',
                    populate:{
                        path: 'anfitrion',
                        model: 'User',
                        select: 'nombre apellido'
                    }
                    
                }]);
        if (invitaciones) {
            
            res.sendFile('modarInvitaciones');
        } else {
            res.sendFile('modalSinDatos')
        }
        
    } catch (error) {
        console.log(error);
        res.sendFile('error409');
    }
}

userController.confirmarInvitacion = async ( req, res ) => {
    try {
        const evento = await evento.findByIdAndUpdate(req.params.eventId, {
            lista_invitados: {
                "$elemMatch": {
                    invitado: req.user._id
                },
                "$set": {
                    estado: req.body.respuesta
                }
            }
        }, { new: true }).exec();
        
    } catch (error) {
        console.log(error);
        res.sendFile('error409');
    }
}
module.exports = userController;
