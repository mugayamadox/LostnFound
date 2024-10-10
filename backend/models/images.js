const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImageSchema = new Schema({
    reportId: { type: Schema.Types.ObjectId, ref: 'Report', required: true },
    pictureURLs: [{ type: String, required: true }],
    metadata: String,
    uploadedAt: { type: Date, default: Date.now },
});

const Image = mongoose.model('Image', ImageSchema);
export default Image;

module.exports = mongoose.model('Image', ImageSchema);