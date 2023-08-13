// import required modules

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// set up middleware 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// set up API routes

app.use('/api', apiRoutes);

// set up HTML routes

app.use('/', htmlRoutes);

// listens for incoming connections on the specified port 

app.listen(PORT, () =>
    console.info(`Server is running on PORT ${PORT}`)
);

