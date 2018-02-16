const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  smoochId: {
    type: String,
    required:'you must supply a smooch Id'
  }
});

module.exports = mongoose.model('User', reviewSchema);
