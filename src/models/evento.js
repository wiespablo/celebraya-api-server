const { Schema, model } = require ('mongoose');

const eventoSchema = new Schema ({
    tematica: String,
    lugar: String,
    fecha: Date,
    /*
    fecha: {
        type: Date,
        required: true,
        min: new Date(new Date().setHours(0, 0, 0, 0)), // Establece la hora a las 00:00:00.000
        max: new Date(new Date().setHours(23, 59, 59, 999)), // Establece la hora a las 23:59:59.999
      },
      */
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


