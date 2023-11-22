const { Schema, model } = require ('mongoose');

const invitacionSchema = new Schema ({
    
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    evento: {
        type: Schema.Types.ObjectId,
        ref: 'Evento'
    }

}, {
    timestamps: true  
})




module.exports = model('Invitacion', invitacionSchema);