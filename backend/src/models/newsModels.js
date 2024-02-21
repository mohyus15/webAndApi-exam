const mongoose = require('mongoose');
const newsSchema = mongoose.Schema(
  {
   /* 
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    */
	
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('News', newsSchema);
