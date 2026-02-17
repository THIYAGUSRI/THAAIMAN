import mongoose from "mongoose";

const eventDetailSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
        unique: true
    },
    title : {
        type: String,
        required: true
    },
    images : [
        {
            type: String,
            required: true
        }
    ],
    location : {
        type: String,
        required: true
    },
    address : {
        type : String,
        required: true
    },
    startDate : {
        type: String,
    },
    endDate : {
        type: String,
    },
    time : {
        type: String,
    },
    price : {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},{timestamps: true});

const EventDetail = mongoose.model("EventDetail", eventDetailSchema);

export default EventDetail;