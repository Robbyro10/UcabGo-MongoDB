const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, getClients, revalidarToken, updateClient, changePassword, activateClient, deleteClient } =  require('../controllers/clients');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


    router.post(
    '/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('email', 'Debe ser un correo de la UCAB').contains('ucab.edu.ve'),
        check('phone', 'El numero telefonico es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ]
    , crearUsuario);
    
    router.post('/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    loginUsuario);
    
    // Obtener clientes
    router.get('/', getClients);

    router.delete('/:id', deleteClient);

    router.patch('/activate/:id', activateClient);

    // cambiar contraseña
    router.patch('/:id', changePassword);

    router.put('/:id', updateClient);
     
    router.get('/renew', validarJWT, revalidarToken);


    module.exports = router;