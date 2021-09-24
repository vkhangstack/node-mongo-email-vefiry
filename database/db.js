const mongoose = require('mongoose');

module.exports = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(process.env.DB_URL, connectionParams);
    console.log('Connected data base success!');
  } catch (err) {
    console.log('Connected data base failed' + err);
  }
};
