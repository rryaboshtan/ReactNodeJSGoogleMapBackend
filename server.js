const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

// const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://googlemapsapplication.herokuapp.com'];
// const corsOptions = {
//    origin: function (origin, callback) {
//       console.log('** Origin of request ' + origin);
//       if (whitelist.indexOf(origin) !== -1 || !origin) {
//          console.log('Origin acceptable');
//          callback(null, true);
//       } else {
//          console.log('Origin rejected');
//          callback(new Error('Not allowed by CORS'));
//       }
//    },
// };


app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

require('./src/database/database')();

app.use('/', require('./src/router/router'));

// For deploy only
if (process.env.NODE_ENV === 'production') {
   // Serve any static files
   app.use(express.static(path.join(__dirname, 'frontend/build')));
   // Handle React routing, return all requests to React app
   app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
   });
}

app.listen(5000, () => console.log('Server is started on http://localhost:5000'));
