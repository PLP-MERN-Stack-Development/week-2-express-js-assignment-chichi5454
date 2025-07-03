const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const validateProduct = require('../middleware/validateProduct');
const products = [];

router.get('/', (req, res) => {
  const { category, page = 1, limit = 5, search } = req.query;
  let results = [...products];

  if (category) {
    results = results.filter(p => p.category === category);
  }

  if (search) {
    results = results.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + parseInt(limit));

  res.json(paginated);
});

router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

router.post('/', validateProduct, (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.put('/:id', validateProduct, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));
  products[index] = { id: req.params.id, ...req.body };
  res.json(products[index]);
});

router.delete('/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));
  products.splice(index, 1);
  res.status(204).end();
});

router.get('/stats/count-by-category', (req, res) => {
  const count = {};
  for (let p of products) {
    count[p.category] = (count[p.category] || 0) + 1;
  }
  res.json(count);
});

module.exports = router;
