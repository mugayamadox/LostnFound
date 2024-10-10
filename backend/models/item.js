const mongoose = require('mongoose');

const { Schema } = mongoose;

// items collection with a foreign key to the report table, name, description, status and updated at columns
const ItemSchema = new Schema({
    reportId: { type: Schema.Types.ObjectId, ref: 'Report', required: true },
    typeId: { type: Schema.Types.ObjectId, ref: 'ItemType', required: true },
    name: { type: String, required: true },
    description: String,
    updatedAt: { type: Date, default: Date.now },
});

// comments collection with a foreign key to the report table, comment and created at columns
const CommentSchema = new Schema({
    reportId: { type: Schema.Types.ObjectId, ref: 'Report', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.model('Item', itemSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = mongoose.model('Item', ItemSchema);