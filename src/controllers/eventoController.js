const eventoController = {};
const Evento = require('../models/evento');
const Invitacion = require('../models/invitacion')
eventoController.register = async (req, res) => {
    try {
        const evento = await new Evento(req.body);
        await evento.save();
        if (evento) {
            evento.lista_invitados.map(async invitado =>{
                const invitacion = await new Invitacion();
                invitacion.usuario = invitado.invitado;
                invitacion.evento = evento._id;
                await invitacion.save();
            })
            res.status(201).json(evento);
        
        } else {
            res.sendStatus(204);
        }
    } catch (error) {
        res.sendStatus(409)
    }
}

module.exports = eventoController;