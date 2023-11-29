const eventoController = {};
const Evento = require('../models/evento');
const Invitacion = require('../models/invitacion');
const Asignacion = require('../models/asignacion');
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

eventoController.misEventos = async ( req, res ) => {
    try {
        const eventos = await Evento.find({ $or: [ { anfitrion : req.user._id } , { 'lista_invitados.invitado': req.user._id } ] })
        .populate({
            path: 'anfitrion',
            model: 'User',
            select: 'nombre apellido'
        })
        .populate({
            path: 'lista_invitados.invitado',
            model: 'User',
            select: 'nombre apellido'
        }).exec();
        if (eventos) {

            res.status(200).json(eventos);
        } else {
            res.sendStatus(204);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(409);
    }
}

eventoController.verEvento = async (req, res) =>{
    try {
        const evento = await (await Evento.findById(req.params.id))
            .populate({
                path: 'anfitrion',
                model: "User"
            })
            .populate({
                path: 'lista_invitados.invitado',
                model:'User'
            }).exec()
    } catch (error) {
        console.log(error);
        res.sendStatus(409)
    }

}

eventoController.verAsignaciones = async (req, res) => {
    try {
        const asignaciones = await Asignacion.find({evento: req.params.id}).populate({path: 'usuario',model: 'User'}).exec();
        if (asignaciones) {
            res.status(200).json(asignaciones)
        } else {
           res.sendStatus(204) 
        }
        
    } catch (error) {
        console.log(error);
        res.sendStatus(409)
    }
}

eventoController.eliminar = async (req, res) => {
    try {
        const evento = await Evento.findByIdAndDelete(req.params.id).exec();
        if (evento) {
            await Invitacion.deleteMany({evento: evento._id}).exec();
            await Asignacion.deleteMany({evento: evento._id}).exec();
            res.status(200).json(evento)
        } else {
            res.sendStatus(204)
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(409)
    }
}

eventoController.editar = async (req, res) => {
    try {
        const evento = await Evento.findByIdAndUpdate(req.params.id, req.body, { new : true }).exec();
        if (evento) {
            res.status(201).json(evento);
        
        } else {
            res.sendStatus(204);
        }
    } catch (error) {
        res.sendStatus(409)
    }
}

eventoController.agregarinvitado = async (req, res) => {
    try {
        
        const evento = await Evento.findByIdAndUpdate(req.params.id, {'lista_invitados': {$set: req.body}}, { new : true }).exec();
        if (evento) {
            res.status(201).json(evento);
        
        } else {
            res.sendStatus(204);
        }
    } catch (error) {
        res.sendStatus(409)
    }
}
eventoController.eliminarInvitado = async (req, res) => {
    try {
        console.log('body ==>', req.body);
        const evento = await Evento.findById(req.params.id).exec()
        if (evento) {
            await evento.lista_invitados.pull(req.body);
            await evento.save()
            res.status(201).json(evento);
        
        } else {
            res.sendStatus(204);
        }
    } catch (error) {
        res.sendStatus(409)
    }
}
module.exports = eventoController;