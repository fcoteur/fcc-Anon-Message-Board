var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var threadSchema = new Schema(
  {
    board: {type: String}, 
    text: {type: String},
    created_on: {type: Date, default: Date.now },
    bumped_on: {type: Date, default: Date.now },
    reported: {type: Boolean},
    delete_password: {type: String},
    replies: [{
      text: {type: String},
      created_on: {type: Date, default: Date.now },
      reported: {type: Boolean,  default: false},
      delete_password: {type: String}
    }]
  }
);

module.exports = mongoose.model('Thread', threadSchema);