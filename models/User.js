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
  },
  active:{
      type:Boolean,
      default:true
  }
});

module.exports = mongoose.model('User', reviewSchema);
