const { Schema, model } = require ('mongoose');

const asignacionSchema = new Schema ({
    descripcion: String,
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    evento: {
        type: Schema.Types.ObjectId,
        ref: 'Evento'
    },

  


}, {
    timestamps: true  
})




module.exports = model('Asignacion', asignacionSchema);