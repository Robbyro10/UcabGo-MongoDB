const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createStore, loginStore, revalidarToken, getStores, getStoreById } =  require('../controllers/stores');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('phone', 'El numero telefonico es obligatorio').not().isEmpty(),
        check('desc', 'La descripcion es obligatoria').not().isEmpty(),
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
    
    router.get('/renew', validarJWT, revalidarToken);
    
    router.get('/:id', getStoreById);

module.exports = router;