const { response } = require('express');
const Solicitud = require('../models/solicitudModel');

const getSolicitudes = async(req, res = response) => {

    const solicitud = await Solicitud.find().populate('usuario', 'asunto tipo fecha');


    res.json({
        ok: true,
        solicitud
    });
}
const crearSolicitud = async(req, res = response) => {
    const uid = req.uid;

    const solicitud = new Solicitud({
        usuario: uid,
        ...req.body
    });

    try {

        const BustamanteDB = await solicitud.save();
        res.json({
            ok: true,
            solicitud: BustamanteDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarSolicitud = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const solicitud = await Solicitud.findById(id);
        if (!solicitud) {
            return res.status(404).json({
                ok: true,
                msg: 'Solicitud no existe'

            });
        }

        const cambiosSolicitud = {
            ...req.body,
            usuario: uid
        }

        const solicitudActualizada = await Solicitud.findByIdAndUpdate(id, cambiosSolicitud, { new: true });

        return res.json({
            ok: true,
            solicitud: solicitudActualizada

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarSolicitud = async(req, res = response) => {
    const id = req.params.id;

    try {

        const solicitud = await Solicitud.findById(id);
        if (!solicitud) {
            return res.status(404).json({
                ok: true,
                msg: 'Solicitud no existe'

            });
        }

        await Solicitud.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Solicitud Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}


module.exports = {
    getSolicitudes,
    crearSolicitud,
    actualizarSolicitud,
    eliminarSolicitud
}