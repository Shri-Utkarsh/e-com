const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// Create Order
router.post('/', protect, async (req, res) => {
    const { items, totalAmount, shippingAddress } = req.body;
    if (items && items.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    } else {
        const order = new Order({
            user: req.user._id,
            items,
            totalAmount,
            shippingAddress
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

// Get My Orders
router.get('/myorders', protect, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

// Admin: Get All Orders
router.get('/', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name email').populate('items.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
