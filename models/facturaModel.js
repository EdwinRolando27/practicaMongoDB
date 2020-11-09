const { Schema, model } = require('mongoose');

const FacturaSchema = Schema({
    pagoTotal: {
        type: String,
        required: true,

    },
    fecha: {
        type: String,
        required: true
    },
    pago: {
        type: Schema.Types.ObjectId,
        ref: 'Pago',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    detalle: {
        type: String
    }

}, { collection: 'facturas' });

FacturaSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, ...object } = this.toObject();

    return object;

})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Factura', FacturaSchema);