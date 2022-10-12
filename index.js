const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Create express server
const app = express();

// DataBase
dbConnection();

console.log('testing something');

// CORS
app.use(cors());

// Public Directory
app.use( express.static( 'public' ));

// Read and parse of body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

//listen petitions
app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);   
})