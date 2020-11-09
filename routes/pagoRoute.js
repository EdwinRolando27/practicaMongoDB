const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const { getPagos, actualizarPago, eliminarPago, crearPago } = require('../controllers/pagoController');


const router = Router();

router.get('/', getPagos);


router.post('/', [
        validarJWT,
        check('concepto', 'El concepto del pago es obligatorio').not().isEmpty(),
        check('monto', 'El monto del pago es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearPago);

router.put('/:id', [
        validarJWT,
        check('concepto', 'El concepto del pago es obligatorio').not().isEmpty(),
        check('monto', 'El monto del pago es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarPago);

router.delete('/:id',
    validarJWT,
    eliminarPago);



module.exports = router;