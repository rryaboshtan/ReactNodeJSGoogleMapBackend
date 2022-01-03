const route = require('express').Router();
const controller = require('../controller/controller');
const store = require('../middleware/multer')

route.get('/apartments', controller.getApartments);
route.post('/uploadApartment', store.array('images', 12), controller.uploads);
// route.post('/uploadmultiple', controller.uploads);

module.exports = route;
