import mongoose from "mongoose";

const whistlistSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  product_id: { type: String, required: true },
  listAdded: { type: Boolean, default: false }
});

const Whistlist = mongoose.model("Whistlist", whistlistSchema);

export default Whistlist;