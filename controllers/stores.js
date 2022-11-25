const {response} = require('express');
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
            uid: store.id,
            name: store.name,
            email: store.email,
            desc: store.desc,
            phone: store.phone,
            location: store.location,
            rif: store.rif,
            img: store.img,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
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
            email: store.email,
            desc: store.desc,
            phone: store.phone,
            location: store.location,
            rif: store.rif,
            img: store.img,
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

    res.json({stores});
}

const getStoreById = async(req, res = response) => {

    const storeId = req.params.id;

    try {
        
        const store = await Store.findById(storeId);

        if (!store) {
            return res.status(404).json({
                ok: false,
                msg: 'Store not found with id'
            })
        }

        res.json({
            ok: true,
            store
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Que carajoo?'
        })
    }
}

const updateStore = async(req, res = response) => {
    const storeId = req.params.id;

    try {
        
        const store = await Store.findById(storeId);
        
        if (!store) {
            return res.status(404).json({
                ok: false,
                msg: 'Store not found with id'
            })
        }

        const updatedStore = await Store.findByIdAndUpdate(storeId, req.body, {new: true});
        res.json({
            updatedStore
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal'
        })
    }
}

const changePassword = async (req, res = response) => {
    const storeId = req.params.id;
    const {password} = req.body;

    try {
        
        const store = await Store.findById(storeId);

        if (!store) {
            return res.status(404).json({
                ok: false,
                msg: 'Store not found with id'
            })
        }

        const salt = bcrypt.genSaltSync();
        store.password = bcrypt.hashSync(password, salt)

        const updatedStore = await Store.findByIdAndUpdate(storeId, store, {new: true});
        res.json({
            updatedStore
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal'
        })
    }
}

const revalidarToken = async (req, res = response) => {

    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT(uid, name);

    const {email, phone, desc, rif, location, img} = await Store.findOne({uid})

    res.json({
        uid, name,
        email,
        phone, desc,
        rif, location,
        img, token
        
    })
}

module.exports = {
    createStore,
    loginStore,
    changePassword,
    getStores,
    getStoreById,
    updateStore,
    revalidarToken
}