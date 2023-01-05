const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { generarJWT } = require('../helpers/jwt')

const crearAdmin = async (req, res = response) => {

    const {email, password} = req.body;
    
    try {

        let admin = await Admin.findOne({email});
        
        if (admin) {
            return res.status(400).json({
                ok: false,
                msg:'Un administrador ya existe con ese correo'
            })
        }

        admin = new Admin(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        admin.password = bcrypt.hashSync(password, salt)
    
        await admin.save();
    
        // Generar JWT
        const token = await generarJWT(admin.id, admin.name);

        res.status(201).json({
            ok: true,
            uid: admin.id,
            name: admin.name,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado'
        });
    }
}

const loginAdmin = async(req, res = response) => {

    const { email, password } =  req.body;

    try {
        
        const admin = await Admin.findOne({email});
        
        if (!admin) {
            return res.status(400).json({
                ok: false,
                msg:'No existe un admin con ese correo'
            });
        }

        // Confirmar password
        const validPassword = bcrypt.compareSync(password, admin.password);
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        // Generar JWT
        const token = await generarJWT(admin.id, admin.name);

        res.json({
            ok: true,
            uid: admin.id,
            name: admin.name,
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
    crearAdmin,
    loginAdmin,
    revalidarToken
}