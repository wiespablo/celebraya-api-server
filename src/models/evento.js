const { Schema, model } = require ('mongoose');

const eventoSchema = new Schema ({
    tematica: String,
    lugar: String,
    fecha: Date,
    direccion: String,
    hora: String,
    anfitrion: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lista_invitados: [{
        invitado: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        estado: {
            type: String,
            default: "pending"//Confirmado
        }
    }],

}, {
    timestamps: true  
})




module.exports = model('Evento', eventoSchema);




