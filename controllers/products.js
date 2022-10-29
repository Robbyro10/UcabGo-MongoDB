const { response } = require('express');
const Product = require('../models/Product');

const getProduct = async (req, res = response) => {

    const products = await Product.find();

    res.json({
        ok: true,
        products
    });
}

const createProduct = async (req, res = response) => {

    const product = new Product(req.body);
    
    try {
        product.store = req.uid;

        const savedProduct = await product.save();

        await product.save();

        res.json({
            ok: true,
            product: savedProduct
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: 'Algo salio mal'
        });
    }
}

const getProductById = async (req, res = response) => {

    const productId = req.params.id;

    try {
        
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                ok: false,
                msg: 'Product not found with id'
            })
        }

        res.json({
            ok: true,
            product
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal'
        })
    }
}

const updateProduct = async (req, res = response) => {

    const productId = req.params.id;
    const uid = req.uid;

    try {
        
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                ok: false,
                msg: 'Product not found with id'
            })
        }

        if (product.store.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene el privilegio de editar ese producto'
            })
        }

        const newProduct = {
            ...req.body,
            store: uid
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, newProduct, {new: true});
        res.json({
            ok: true,
            product: updatedProduct
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal'
        })
    }
}

const deleteProduct = async (req, res = response) => {

    const productId = req.params.id;
    const uid = req.uid;

    try {
        
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                ok: false,
                msg: 'Product not found with id'
            })
        }

        if ( product.store.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene el privilegio de eliminar ese producto'
            })
        }

        await Product.findByIdAndDelete(productId);
        res.json({
            ok: true,
            msg: 'Product deleted successfully'
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal'
        })
    }
}


module.exports = {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}