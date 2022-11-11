const { Router } = require("express");
const { check } = require("express-validator");
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getOrder, createOrder, deleteOrder, getOrderByStoreId, dispatchOrder } = require('../controllers/orders');

const router = Router();

// Obtener orden
router.get('/', getOrder);

// Obtener Orden por Id del Store
router.get('/:id', getOrderByStoreId);

// Eliminar pedido
router.delete('/:id', deleteOrder);

// Marcar pedido como "Despachado"
router.put('/:id', dispatchOrder);

// Todos deben pasar por la validacion del JWT
router.use(validarJWT);
// Crear una nueva orden
router.post('/',
    [
        check('location', 'La ubicacion es obligatoria').not().isEmpty(),
        check('payment', 'El metodo de pago es obligatorio').not().isEmpty(),
        check('appearance', 'La descripcion de aparienca es obligatoria').not().isEmpty(),
        validarCampos
    ],
    createOrder
);


module.exports = router;