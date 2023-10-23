const Product = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const product = new Product({ name, description, price });
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Could not create the product' });
    }
};

// Get a list of all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch products' });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, description, price }, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Could not update the product' });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Could not delete the product' });
    }
};

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
};
