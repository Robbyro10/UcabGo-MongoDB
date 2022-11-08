const { Router } = require("express");
const { check } = require("express-validator");
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getOrderProducts, createOrderProduct } = require('../controllers/orderProducts');

const router = Router();

// Todos deben pasar por la validacion del JWT
router.use(validarJWT);

// Obtener orden
router.get('/', getOrderProducts);

// Obtener Orden por Id del Store
// router.get('/:id', getOrderByStoreId);

// Eliminar producto
// router.delete('/:id', deleteOrder);

// Crear una nueva orden
router.post('/',
    [
        check('quantity', 'La cantidad es obligatoria').not().isEmpty(),
        validarCampos
    ],
    createOrderProduct
);


module.exports = router;