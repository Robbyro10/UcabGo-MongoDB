const { Router } = require("express");
const { check } = require("express-validator");
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getOrder, createOrder, deleteOrder } = require('../controllers/orders');

const router = Router();

// Todos deben pasar por la validacion del JWT
router.use(validarJWT);

// Obtener orden
router.get('/', getOrder);

// Crear una nueva orden
router.post('/',
    [
        check('location', 'La ubicacion es obligatoria').not().isEmpty(),
        validarCampos
    ],
    createOrder
);

// Eliminar producto
router.delete('/:id', deleteOrder);

module.exports = router;