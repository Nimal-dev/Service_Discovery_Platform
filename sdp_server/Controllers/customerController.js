const { Cart, CartItem } = require('../Models/cartModel');
const { Order } = require('../Models/orderModel');


exports.addToCart = async (req, res) => {
  const { customerId, serviceId } = req.body;
  try {
    let cart = await Cart.findOne({ userId: customerId });
    if (!cart) {
      cart = new Cart({ userId: customerId, items: [] });
    }
    const itemExists = cart.items.some(item => item.serviceId.toString() === serviceId);
    if (!itemExists) {
      cart.items.push(new CartItem({ serviceId }));
    } else {
      return res.json({ success: false, message: 'Product already in cart' });
    }
    await cart.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.json({ success: false, message: 'Error adding product to cart' });
  }
};

exports.getCart = async (req, res) => {
    const { customerId } = req.params;
    try {
      const cart = await Cart.findOne({ userId: customerId }).populate('items.serviceId');
      if (!cart) {
        return res.json({ items: [] });
      }
      res.json({ items: cart.items });
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.json({ items: [] });
    }
  };
  

exports.removeFromCart = async (req, res) => {
  const { customerId, serviceId } = req.params;
  try {
    const cart = await Cart.findOne({ userId: customerId });
    if (!cart) {
      return res.json({ success: false, message: 'Cart not found' });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter(item => item.serviceId.toString() !== serviceId);
    await cart.save();
    
    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.json({ success: false, message: 'Error removing item from cart' });
  }
};



// -----------------Placing Order--------------------------//

exports.placeOrder = async (req, res) => {
    const { customerId, address } = req.body;
    try {
      const cart = await Cart.findOne({ userId: customerId }).populate('items.serviceId');
      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }
  
      const orderItems = cart.items.map(item => ({
        serviceId: item.serviceId._id,
        price: item.serviceId.serviceprice,
        quantity: 1 // Assuming quantity is always 1 for simplicity
      }));
  
      const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
      const newOrder = new Order({
        userId: customerId,
        items: orderItems,
        total,
        address
      });
  
      await newOrder.save();
  
      // Clear the cart after placing the order
      await Cart.findOneAndDelete({ userId: customerId });
  
      res.status(201).json({ success: true, message: 'Order placed successfully' });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ success: false, message: 'Error placing order' });
    }
  };
  
  // Get orders
  exports.getOrders = async (req, res) => {
    const { customerId } = req.params;
    try {
      const orders = await Order.find({ userId: customerId }).populate('items.serviceId');
      res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
  };