const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createStore, loginStore, revalidarToken, getStores, getStoreById, updateStore, changePassword, activateStore, deleteStore } =  require('../controllers/stores');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('phone', 'El numero telefonico es obligatorio').not().isEmpty(),
        check('desc', 'La descripcion es obligatoria').not().isEmpty(),
        check('rif', 'El rif es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
        check('location', 'La ubicacion es obligatoria').not().isEmpty(),
        validarCampos
    ]
    , createStore);
    
    router.post('/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    loginStore);

    
    router.get('/', getStores);

    router.delete('/:id', deleteStore);

    router.patch('/activate/:id', activateStore);
    
    // cambiar contraseña
    router.patch('/:id', changePassword);

    router.put('/:id', updateStore);

    router.get('/renew', validarJWT, revalidarToken);
    
    router.get('/:id', getStoreById);

module.exports = router;