var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var replySchema = new Schema(
  {
    text: {type: String},
    created_on: {type: Date, default: Date.now },
    reported: {type: Boolean},
    delete_password: {type: String},
    thread: { type: Schema.Types.ObjectId, ref: 'Thread' }
  }
);

module.exports = mongoose.model('Reply', replySchema);