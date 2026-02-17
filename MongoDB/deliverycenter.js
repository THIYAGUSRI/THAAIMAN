import mongoose from "mongoose";

const deliverycenterSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
        unique: true
    },
    deliveryCenterName: {
        type: String,
        required: true
    },
    deliveryNickName: {
        type: String,
        required: true,
        unique: true
    },
    userName : {
        type: String,
        required: true
    },
    userMobile : {
        type: Number,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    street : {
        type: String,
        required: true
    },
    area : {
        type: String,
        required: true
    },
    city : {
        type: String,
        required: true
    },
    state : {
        type: String,
        required: true
    },
    pincode : {
        type: Number,
        required: true
    },
    alternateMobile : {
        type: Number,
        required: true
    },
    googleMapLocation : {
        type: String,
        required: true
    },
    availability : {
        type: String,
        default: "inActive"
    },
    location : {
        type: String,
        required: true
    }
})

const DeliveryCenter = mongoose.model("DeliveryCenter", deliverycenterSchema);

export default DeliveryCenter;