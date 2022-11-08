const { response } = require('express');
const OrderProduct = require('../models/OrderProduct');

//todo: talvez deba ser eliminado

const getOrderProducts = async (req, res = response) => {

    const orderProducts = await OrderProduct.find({client: req.uid});

    res.json({
        ok: true,
        orderProducts
    });
}

const createOrderProduct = async (req, res = response) => {

    const orderProduct = new OrderProduct(req.body);
    
    try {
        orderProduct.client = req.uid;

        await orderProduct.save();

        res.json({
            orderProduct
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: 'Algo salio mal'
        });
    }
}

module.exports = {
    getOrderProducts,
    createOrderProduct,
    // deleteProduct,
}