const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Create express server
const app = express();

// DataBase
dbConnection();

// CORS
app.use(cors());

// Public Directory
app.use( express.static( 'public' ));

// Read and parse of body
app.use(express.json());

// Routes
app.use('/api/clients', require('./routes/clients'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/stores', require('./routes/stores'));

//listen petitions
app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);   
})