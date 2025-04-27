const mongoose = require('mongoose');
const {Schema} = mongoose;

const ScanSchema = new Schema({
  name: String,
  eventId:String
})

const ScanModel = mongoose.model('Scan', ScanSchema);

module.exports = ScanModel;
