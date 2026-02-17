import mongoose from "mongoose";

const videoDetailSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    date : {
        type: Date,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    preview : {
        type: String,
        required: true
    },
    likes : {
        type: Number,
        default: 0
    }
},{timestamps: true});

const VideoDetail = mongoose.model("VideoDetail", videoDetailSchema);

export default VideoDetail;