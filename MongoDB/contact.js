import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
        unique: true
    },
    userID : {
        type: String,
        required: true,
    },
    contactType : {
        type: String,
        required: true,
    },
    Comment : {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: String,
        required: true,
    }
},{timestamps: true});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;