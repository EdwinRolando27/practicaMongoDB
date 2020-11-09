const { Schema, model } = require('mongoose');

const RespuestaSchema = Schema({
    respuesta: {
        type: String,
        required: true,
        default: 'Aceptado'
    },
    solicitud: {
        type: Schema.Types.ObjectId,
        ref: 'Solicitud',
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

}, { collection: 'respuestas' });

RespuestaSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, ...object } = this.toObject();

    return object;

})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Respuesta', RespuestaSchema);