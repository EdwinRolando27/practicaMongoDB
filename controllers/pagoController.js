const { response } = require('express');
const Pago = require('../models/pagoModel');

const getPagos = async(req, res = response) => {

    const pago = await Pago.find().populate('usuario', 'concepto renta monto');


    res.json({
        ok: true,
        pago
    });
}
const crearPago = async(req, res = response) => {
    const uid = req.uid;

    const pago = new Pago({
        usuario: uid,
        ...req.body
    });

    try {

        const BustamanteDB = await pago.save();
        res.json({
            ok: true,
            pago: BustamanteDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarPago = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const pago = await Pago.findById(id);
        if (!pago) {
            return res.status(404).json({
                ok: true,
                msg: 'Pago no existe'

            });
        }

        const cambiosPago = {
            ...req.body,
            usuario: uid
        }

        const pagoActualizado = await Pago.findByIdAndUpdate(id, cambiosPago, { new: true });

        return res.json({
            ok: true,
            pago: pagoActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarPago = async(req, res = response) => {
    const id = req.params.id;

    try {

        const pago = await Pago.findById(id);
        if (!pago) {
            return res.status(404).json({
                ok: true,
                msg: 'Pago no existe'

            });
        }

        await Pago.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Pago Eliminado'

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
    getPagos,
    crearPago,
    actualizarPago,
    eliminarPago
}