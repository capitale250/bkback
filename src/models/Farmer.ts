import { Schema, model } from 'mongoose';

const farmerSchema = new Schema({
  email: { type: String, required: true },
  pass: { type: String, required: true },
  role:{type: String, required: true },
  landSize: { type: Number, required: true }, // in acres
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
});

export const Farmer = model('Farmer', farmerSchema);