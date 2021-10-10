require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const privateRoutes = require('./routes/privateRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const errorHandler = require('./middleware/error');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/private', privateRoutes)
app.use('/api/checkout', checkoutRoutes)

// Error Handler (Should be last piece of middleware)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
app.get('/', (req, res) => { res.send('Hello from Express!') });
