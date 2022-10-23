const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const Client = require('../models/Client');
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async (req, res = response) => {

    const {email, password} = req.body;
    
    try {

        let usuario = await Client.findOne({email});
        
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg:'Un usuario ya existe con ese correo'
            })
        }

        usuario = new Client(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)
    
        await usuario.save();
    
        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });
    }
}

const loginUsuario = async(req, res = response) => {

    const { email, password } =  req.body;

    try {
        
        const usuario = await Client.findOne({email});
        
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg:'No existe un usuario con ese correo'
            });
        }

        // Confirmar password
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });
    }
}

const revalidarToken = async (req, res = response) => {

    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid, name,
        token
        
    })
}
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}