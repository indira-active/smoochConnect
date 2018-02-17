const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  smoochId: {
    type: String
  },
  smoochUserId:{
    type: String
  }
});

module.exports = mongoose.model('User', reviewSchema);
