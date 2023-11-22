import mongoose from 'mongoose';//Es un ORM
const bcrypt = require('bcrypt');//Para encriptar las contraseñas
const { Schema, model } = mongoose;

const userSchema = new Schema ({
    nombre: String,
    apellido: String,
    telefono: Number,
    direccion: String,
    email: String,
    password: String
}, {
    timestamps: true  
})

userSchema.pre('save', function(next) {
    const SALT_WORK_FACTOR = 10
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {//Momento de encriptación
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports = model('User', userSchema);




