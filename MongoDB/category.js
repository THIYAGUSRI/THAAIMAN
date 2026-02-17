import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
        unique: true
    },
    categoryName : {
        type: String,
        required: true,
    },
    image : {
        type: String,
        required: true
    },
    active : {
        type: Boolean,
        default: true
    }
},{timestamps: true});

const Category = mongoose.model('Category', categorySchema);

export default Category;