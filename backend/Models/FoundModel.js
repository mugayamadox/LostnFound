import mongoose from "mongoose";

const foundSchema = mongoose.Schema(
    {
        name: {
            type:String,
            required: true,
        },
        foundBy:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        pictureURL :{
            type: String,
            required: true,
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

export const Found = mongoose.model('found', foundSchema);