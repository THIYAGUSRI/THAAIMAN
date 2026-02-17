import mongoose from "mongoose";

const deliveryAddressSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: true
    },
    mobile : {
        type: Number,
        required: true
    },    
    address : {
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
    landmark : {
        type: String,
    }
})

const DeliveryAddress = mongoose.model("DeliveryAddress", deliveryAddressSchema);

export default DeliveryAddress;