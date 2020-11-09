const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const { getSolicitudes, actualizarSolicitud, eliminarSolicitud, crearSolicitud } = require('../controllers/solicitudController');


const router = Router();

router.get('/', getSolicitudes);


router.post('/', [
        validarJWT,
        check('asunto', 'El asunto de la solicitud es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearSolicitud);

router.put('/:id', [
        validarJWT,
        check('asunto', 'El asunto de la solicitud es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarSolicitud);

router.delete('/:id',
    validarJWT,
    eliminarSolicitud);



module.exports = router;