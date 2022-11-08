const { response } = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');

const getOrder = async (req, res = response) => {

    const orders = await Order.find()

    res.json({
        ok: true,
        orders
    });
}

const getOrderByStoreId = async (req, res = response) => {

    const storeId = req.params.id;

    
    try {
        
        const AllOrders = await Order.find().populate('product user')

        const orders = AllOrders.filter((order) => JSON.stringify(order.product.store._id) == `"${storeId}"`);

        if (!orders) {
            return res.status(404).json({
                ok: false,
                msg: 'Orders not found from that store'
            })
        }

        res.json({
            ok: true,
            orders
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        })
    }
}


const createOrder = async (req, res = response) => {

    const order = new Order(req.body);
    
    try {
        order.user = req.uid;

        order.product = await Product.findById(order.product) 

        await order.save();

        res.json({
            ok: true,
            order
        });

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            ok: false, 
            msg: 'Algo salio mal'
        });
    }
}

const deleteOrder = async (req, res = response) => {

    const orderId = req.params.id;
    const uid = req.uid;

    try {
        
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                ok: false,
                msg: 'Order not found with id'
            })
        }

        await Order.findByIdAndDelete(orderId);
        res.json({
            ok: true,
            msg: 'Order deleted successfully'
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        })
    }
}


module.exports = {
    getOrder,
    getOrderByStoreId,
    createOrder,
    deleteOrder,
}