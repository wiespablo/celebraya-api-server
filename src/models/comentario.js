const { Schema, model } = require ('mongoose');

const comentarioSchema = new Schema ({
    mensaje: String,
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




module.exports = model('Evento', comentarioSchema);

