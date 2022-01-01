const mongoose = require('mongoose');

const ApartmentSchema = new mongoose.Schema({
   lat: {
      type: Number,
      unique: false,
      required: true,
   },
   lng: {
      type: Number,
      unique: false,
      required: true,
   },
   icon: {
      type: String,
      unique: false,
      required: true,
   },
   image: {
      type: String,
      unique: false,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   cost: {
      type: String,
      required: true,
   },
   areaOfCity: {
      type: String,
      required: true,
   },
});

const ApartmentModel = mongoose.model('apartments', ApartmentSchema);

module.exports = ApartmentModel;
