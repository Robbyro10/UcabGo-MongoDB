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
            email: usuario.email,
            phone: usuario.phone,
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

        if (!usuario.active) {
            return res.status(400).json({
                ok: false,
                msg: 'Su cuenta esta bloqueada'
            })
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
            email: usuario.email,
            phone: usuario.phone,
            token
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });
    }
}

const getClients = async(req, res = response) => {

    const clients = await Client.find();

    res.json({
        ok: true,
        clients
    });
}

const updateClient = async(req, res = response) => {
    const clientId = req.params.id;

    try {
        
        const client = await Client.findById(clientId);

        if (!client) {
            return res.status(404).json({
                ok: false,
                msg: 'Client not found with id'
            })
        }

        const updatedClient = await Client.findByIdAndUpdate(clientId, req.body, {new: true});
        res.json({
            updatedClient
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal'
        })
    }
}

const changePassword = async (req, res = response) => {
    const clientId = req.params.id;
    const {password} = req.body;

    try {
        
        const client = await Client.findById(clientId);

        if (!client) {
            return res.status(404).json({
                ok: false,
                msg: 'Client not found with id'
            })
        }

        const salt = bcrypt.genSaltSync();
        client.password = bcrypt.hashSync(password, salt)

        const updatedClient = await Client.findByIdAndUpdate(clientId, client, {new: true});
        res.json({
            updatedClient
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

    const {email, phone} = await Client.findOne({uid})

    res.json({
        email, phone, 
        uid, name, token
    })
}

const activateClient = async (req, res = response) => {
    const clientId = req.params.id;

    try {
        
        const client = await Client.findById(clientId);

        if (!client) {
            return res.status(404).json({
                ok: false,
                msg: 'Client not found with id'
            })
        }

        await Client.findByIdAndUpdate(clientId, {active: true});
        res.json({
            ok: true,
            msg: 'Client activated successfully'
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal'
        })
    }
}

const deleteClient = async (req, res = response) => {
    const clientId = req.params.id;

    try {
        
        const client = await Client.findById(clientId);

        if (!client) {
            return res.status(404).json({
                ok: false,
                msg: 'Client not found with id'
            })
        }

        await Client.findByIdAndUpdate(clientId, {active: false});
        res.json({
            ok: true,
            msg: 'Client deleted successfully'
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal'
        })
    }
}

module.exports = {
    crearUsuario,
    loginUsuario,
    updateClient,
    changePassword,
    getClients,
    revalidarToken,
    deleteClient,
    activateClient
}