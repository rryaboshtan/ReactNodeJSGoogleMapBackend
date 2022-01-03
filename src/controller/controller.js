const fs = require('fs');
const ApartmentModel = require('../model/schema');
const markerImage = '/blueCircle.png';

exports.getApartments = async (req, res) => {
   const allApartments = await ApartmentModel.find({});

   try {
      res.send(allApartments);
   } catch (error) {
      console.log(error);
   }
};

exports.uploads = (req, res, next) => {
   const files = req.files;
   console.log(req.body);

   if (!files) {
      const error = new Error('Please choose files');
      error.httpStatusCode = 400;
      return next(error);
   }

   const image = fs.readFileSync(files[0].path);

   const encodeImage = image.toString('base64');

   const apartment = {
      lat: req.body.lat,
      lng: req.body.lng,
      icon: markerImage,
      image: encodeImage,
      description: req.body.description,
      cost: req.body.cost,
      areaOfCity: req.body.areaOfCity,
   };

   const apartmentModel = new ApartmentModel(apartment);

   apartmentModel
      .save()
      .then(() => {
         console.log('Apartment successfully loaded to a database');
         return { message: `Apartment successfully loaded to a database` };
      })
      .catch(error => {
         if (error) {
            console.log('Error name:', error);
            return Promise.reject({ error: error.message || 'Cannot load apartment info to the database' });
         }
      });
};
