const mongoose = require('mongoose');

const OrderItemSchema = mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'service', required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true }
});

const OrderSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  items: [OrderItemSchema],
  total: { type: Number, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = { Order };
