const {
  getProducts,
  getProductsById,
  createProduct,
  deleteProduct,
  getTopProducts,
} = require('../controllers/productController.js');
const express = require('express');
const { admin, protect } = require('../midddelwars/permission.js');

const productRouter = express.Router();
productRouter.post('/:id/review', protect);
productRouter.get('/top', getTopProducts);
productRouter.post('/', createProduct);
productRouter.get('/', getProducts);
productRouter.get('/:id', getProductsById);
productRouter.delete('/:id', deleteProduct);
module.exports = productRouter;
