import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  order_ID: {
    type: String,
    required: true,
    unique: true,
  },
  userID: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: '',
  },
  order_items: [
    {
      prod_ID: { type: String, required: true },
      prod_Name: { type: String, required: true },
      selectedRate: {
        key: { type: String, required: true },
        value: { type: Number, required: true },
      },
      order_quantity: { type: Number, required: true },
      actual_quantity: { type: Number, default: 0 },
      subtotal: { type: Number, required: true },
      actual_subtotal: { type: Number, default: 0 },
      image: { type: String },
    },
  ],
  total: { type: Number, required: true },
  gst: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },
  actual_grandTotal: { type: Number, default: 0 },
  order_deliveryDay: { type: String, required: true },
  order_deliveryTime: { type: String, required: true },
  order_direction: { type: String },
  order_selectedAddress: {
    id: { type: String, required: true },
    userID: { type: String, required: true },
    nickName: { type: String },
    mobile: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number, required: true },
    landMark: { type: String },
  },
  currentDate: { type: String, required: true },
  currentTime: { type: String, required: true },
  deliveryProcess: {
    type: String,
    default: "Order Placed"
  },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
