var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var threadSchema = new Schema(
  {
    board: {type: String}, 
    text: {type: String},
    created_on: {type: Date, default: Date.now },
    bumped_on: {type: Date, default: Date.now },
    reported: {type: Boolean, default: false},
    delete_password: {type: String},
    replies: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
  }
);

module.exports = mongoose.model('Thread', threadSchema);