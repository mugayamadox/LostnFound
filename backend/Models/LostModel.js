import mongoose from "mongoose";

const lostSchema = mongoose.Schema(
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

export const Lost = mongoose.model('lost', lostSchema);