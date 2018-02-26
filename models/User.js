const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  smoochId: {
    type: String,
     trim: true
  },
  smoochUserId:{
    type: String,
     trim: true
  },
  active:{
      type:Boolean,
      default:true
  },
  messages:[Object]
},{ toJSON: { virtuals: true },
  toObject: { virtuals: true },
});
reviewSchema.index({
  smoochId: 'text',
  smoochUserId: 'text'
});

module.exports = mongoose.model('User', reviewSchema);
