import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  farmer: { type: Schema.Types.ObjectId, ref: 'Farmer', required: true },
  fertilizer: { type: String, required: true },
  fertilizerQty: { type: Number, required: true },
  seed: { type: String, required: true },
  seedQty: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
});

export const Order = model('Order', orderSchema);