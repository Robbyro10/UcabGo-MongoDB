const { Router } = require("express");
const { check } = require("express-validator");
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getProduct, createProduct, updateProduct, deleteProduct, getProductById } = require('../controllers/products');

const router = Router();

// Obtener productos
router.get('/', getProduct);
// Obtener producto
router.get('/:id', getProductById);

// Todos deben pasar por la validacion del JWT
router.use(validarJWT);

// Crear un nuevo producto
router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('desc', 'La Descripcion es obligatoria').not().isEmpty(),
        check('price', 'El precio es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createProduct
);

// Actualizar producto
router.put('/:id', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('desc', 'La Descripcion es obligatoria').not().isEmpty(),
    check('price', 'El precio es obligatorio').not().isEmpty(),
    validarCampos
], updateProduct);

// Eliminar producto
router.delete('/:id', deleteProduct);

module.exports = router;