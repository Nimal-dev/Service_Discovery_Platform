const mongoose = require('mongoose');

const CartItemSchema = mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'service', required: true }, // Change 'Product' to 'service'
});

const CartItem = mongoose.model("CartItem", CartItemSchema);

const CartSchema =  mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  items: [CartItemSchema],
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart, CartItem };






// const mongoose = require('mongoose');

// const CartItemSchema = mongoose.Schema({
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     default: 1
//   }
// });

// const CartSchema =  mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user', // Assuming you have a User model
//     required: true
//   },
//   items: [CartItemSchema]
// });

// const Cart = mongoose.model('Cart', CartSchema);
// const CartItem = mongoose.model('CartItem', CartItemSchema);

// module.exports = { Cart, CartItem };

