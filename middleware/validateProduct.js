const { ValidationError } = require('../utils/errors');

module.exports = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price === undefined || !category || inStock === undefined) {
    throw new ValidationError('Missing required product fields');
  }
  if (typeof price !== 'number' || typeof inStock !== 'boolean') {
    throw new ValidationError('Invalid data types');
  }
  next();
};
