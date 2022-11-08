const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearAdmin, loginAdmin, revalidarToken } =  require('../controllers/admins');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ]
    , crearAdmin);

router.post('/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    loginAdmin);


router.get('/renew', validarJWT, revalidarToken);


module.exports = router;