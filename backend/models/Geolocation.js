import mongoose from 'mongoose';

const geolocationSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true
    }
});

const Geolocation = mongoose.model('Geolocation', geolocationSchema);

export { Geolocation };
