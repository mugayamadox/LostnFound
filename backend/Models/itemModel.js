import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
    {
        name: {
            type:String,
            required: true,
        },
        lfName:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        pictureURL :{
            type: String,
            required: false,
        },
        contactFound:{
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Item = mongoose.model('item', itemSchema);