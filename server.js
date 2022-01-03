const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

require('./server/database/database')();

app.use('/', require('./server/router/router'));

app.listen(5000, () => console.log('Server is started on http://localhost:5000'));