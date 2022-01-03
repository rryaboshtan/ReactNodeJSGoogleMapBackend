const mongoose = require('mongoose');
const config = require('../../config');

const connect = async () => {
   try {
      const connection = await mongoose.connect(config.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });

      console.log(`MongoDB connected: ${connection.connection.host}`);
   } catch (err) {
      console.log(err);
      process.exit(1);
   }
};

module.exports = connect;
