import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  items: [
    {
      prod_ID: { type: String, required: true },
      quantity: { type: Number, required: true },
      selectedRate: {
        key: { type: String, required: true },
        value: { type: Number, required: true },
      },
      prod_Name: { type: String, required: true },
      image: { type: String, required: true },
      prod_Rate: [{ type: Object }],
      subtotal: { type: Number, required: true },
    },
  ],
  total: { type: Number, default: 0 },
  gst: { type: Number, default: 0 },
  deliveryCharge: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  grandTotal: { type: Number, default: 0 },
});

export default mongoose.model('Cart', cartSchema);