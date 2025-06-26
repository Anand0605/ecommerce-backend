// controllers/productController.js
const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const newProduct = new Product({ name, description, price, imageUrl });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const updateData = { name, description, price };
  if (req.file) {
    updateData.imageUrl = `/uploads/${req.file.filename}`;
  }
  const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Product deleted' });
};
