const fs = require('fs');
const path = require('path');
const ApartmentModel = require('../model/schema');
const markerImage = '/blueCircle.png';

exports.getApartments = async (req, res) => {
   const apartments = [
      {
         lat: 50.42711686105861,
         lng: 30.453401587110793,
         icon: markerImage,
         apartmentInfo: {
            image: 'flat1.jpg',
            description: 'Квартира подобово в Києві, центр vip',
            cost: '1500 грн / доба',
            areaOfCity: 'Киев, Печерский район, Украина',
         },
      },
      {
         lat: 50.42677371631405,
         lng: 30.454774731468667,
         icon: markerImage,
         apartmentInfo: {
            image: 'flat2.jpg',
            description: '1-комнатная ул.Мельникова',
            cost: 'від 550 грн/доба',
            areaOfCity: 'Киев, Шевченковский район, Украина',
         },
      },
      {
         lat: 50.42852807809127,
         lng: 30.451891886960425,
         icon: markerImage,
         apartmentInfo: {
            image: 'flat3.jpg',
            description: 'Двухместный номер с двуспальной кроватью и кондиционером Саксаганского',
            cost: '650 грн/доба',
            areaOfCity: 'Саксаганского улица, Киев, Печерский район, Украина',
         },
      },
      {
         lat: 50.42852807809127,
         lng: 30.451891886960425,
         icon: markerImage,
         apartmentInfo: {
            image: 'flat3.jpg',
            description: 'Двухместный номер с двуспальной кроватью и кондиционером Саксаганского',
            cost: '650 грн/доба',
            areaOfCity: 'Саксаганского улица, Киев, Печерский район, Украина',
         },
      },
   ];

   const allApartments = await ApartmentModel.find({});
   // console.log(allImages);
   // console.log(apartments);
   // for (let apartment of apartments) {
   //    console.log(apartment);
   //    const { lat, lng, icon } = apartment;
   //    const { image, description, cost, areaOfCity } = apartment.apartmentInfo;
   //    let imageFile = null;
   //    let encodeImage = null;
   //    let imagePath = null;
   //    try {
   //       imagePath = path.resolve(__dirname, '..', '..', 'public', image);
   //       console.log(__dirname);
   //    console.log(imagePath);
   //    imageFile = fs.readFileSync(imagePath);
   //    encodeImage = imageFile.toString('base64');
   // } catch (error) {
   //    console.log(error);
   //    return;
   // }

   // const apartmentModel = new ApartmentModel({
   //    lat,
   //    lng,
   //    icon,
   //    image: encodeImage,
   //    description,
   //    cost,
   //    areaOfCity,
   // });
   // console.log('Apartment model', apartmentModel);
   // apartmentModel
   //    .save()
   //    .then(() => {
   //       console.log('Apartment successfully loaded to a database');
   //       return { message: `Apartment successfully loaded to a database` };
   //    })
   //    .catch(error => {
   //       console.log('ERROR');
   //          if (error) {
   //             console.log('Error name:', error.name);
   //             console.log('Error name:', error);

   //             return Promise.reject({ error: error.message || 'Cannot load apartment info to the database' });
   //          }
   //       });
   // }

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
      lat: 50,
      lng: 30,
      icon: markerImage,
      image: encodeImage,
      description: req.body.description,
      cost: req.body.cost,
      areaOfCity: req.body.areaOfCity,
   };

   console.log(apartment);

   const apartmentModel = new ApartmentModel(apartment);

   apartmentModel
      .save()
      .then(() => {
          console.log('Apartment successfully loaded to a database');
         return { message: `Apartment successfully loaded to a database` };
        
      })
      .catch(error => {
         console.log('ERROR');
         if (error) {
            console.log('Error name:', error.name);
            console.log('Error name:', error);

            return Promise.reject({ error: error.message || 'Cannot load apartment info to the database' });
         }
      });
};
