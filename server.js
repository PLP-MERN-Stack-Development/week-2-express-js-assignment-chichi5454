const express = require('express');
const app = express();
const productRoutes = require('./routes/products');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());
app.use(logger);
app.use(auth);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/products', productRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
