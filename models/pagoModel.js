const { Schema, model } = require('mongoose');

const PagoSchema = Schema({
    concepto: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    renta: {
        type: String,
        default: 'AFP'
    },
    monto: {
        type: String,
        required: true
    },


}, { collection: 'pagos' });

PagoSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, ...object } = this.toObject();

    return object;

})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Pago', PagoSchema);