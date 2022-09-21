const express = require('express');
const router = express.Router();

// Controller

const { register, login, checkAuth } = require('../controller/auth');
const { auth } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');
const { addProduct, getProducts, getProduct, deleteProduct, updateProduct } = require('../controller/product');

// Route
router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', auth, checkAuth);
router.post('/product', auth, uploadFile('image'), addProduct);
router.get('/products', auth, getProducts);
router.get('/product/:id', auth, getProduct);
router.patch('/product/:id', auth, uploadFile('image'), updateProduct);
router.delete('/product/:id', auth, deleteProduct);

module.exports = router;
