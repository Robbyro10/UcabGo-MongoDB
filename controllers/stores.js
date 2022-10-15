const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const Store = require('../models/Store');
const { generarJWT } = require('../helpers/jwt')

const createStore = async (req, res = response) => {


   const {email, password} = req.body;
    
    try {

        let store = await Store.findOne({email});
        
        if (store) {
            return res.status(400).json({
                ok: false,
                msg:'Un usuario ya existe con ese correo'
            })
        }

        store = new Store(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        store.password = bcrypt.hashSync(password, salt)
    
        await store.save();
    
        // Generar JWT
        const token = await generarJWT(store.id, store.name);

        res.status(201).json({
            ok: true,
            title: store.title,
            uid: store.id,
            name: store.name,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });
    }
    
}

const loginStore = async(req, res = response) => {

    const { email, password } =  req.body;

    try {
        
        const store = await Store.findOne({email});
        
        if (!store) {
            return res.status(400).json({
                ok: false,
                msg:'No existe un usuario con ese correo'
            });
        }

        // Confirmar password
        const validPassword = bcrypt.compareSync(password, store.password);
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        // Generar JWT
        const token = await generarJWT(store.id, store.name);

        res.json({
            ok: true,
            uid: store.id,
            name: store.name,
            token
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });
    }
}

const getStores = async(req, res = response) => {

    const stores = await Store.find();

    res.json({
        ok: true,
        stores
    });
}

const revalidarToken = async (req, res = response) => {

    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
        
    })
}

module.exports = {
    createStore,
    loginStore,
    getStores,
    revalidarToken
}