import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  prod_ID: {
    type: String,
    required: true,
    unique: true,
  },
  prod_Name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  prod_category: {
    type: String,
    required: true,
    trim: true,
  },
  prod_Images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
  prod_Rate: [
    {
      type: Map,
      of: Number,
      required: true,
    },
  ],
  prod_Stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  prod_active: {
    type: Boolean,
    default: true,
  },
  prod_Description: {
    type: String,
    required: true,
    trim: true,
  },
  prod_offer: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  sortOrderList: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

productSchema.index({ prod_ID: 1 });

const Product = mongoose.model("Product", productSchema);

export default Product;