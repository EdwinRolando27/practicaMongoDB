const { Schema, model } = require('mongoose');

const SolicitudSchema = Schema({
    asunto: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    tipo: {
        type: String,
        default: 'Solicitud Permiso'
    },
    fecha: {
        type: String
    }

}, { collection: 'solicitudes' });

SolicitudSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, ...object } = this.toObject();

    return object;

})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Solicitud', SolicitudSchema);