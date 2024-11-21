const Cart = require('../models/cart.model');
const Item = require('../models/item.model');

// Fetch the cart for the logged-in user
exports.getCartForAccount = async (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      return res.redirect('/login');
    }

    const accountId = req.session.user._id;

    const cart = await Cart.findOne({ account_id: accountId, is_order: false })
      .populate({
        path: 'items',
        populate: {
          path: 'food_id',
          select: 'name price img category_id',
          populate: {
            path: 'category_id',
            select: 'name', // Only include the category name
          },
        },
      });

    if (!cart || cart.items.length === 0) {
      return res.render('cart', { cartItems: [], message: 'Your cart is empty.' });
    }

    res.render('cart', { cartItems: cart.items, message: null });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).render('error', { message: 'Could not load the cart.' });
  }
};

// Edit the quantity of a cart item
exports.editCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      return res.status(400).send('Invalid quantity');
    }

    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).send('Item not found');
    }

    const cart = await Cart.findOne({ account_id: req.session.user._id, items: item._id });
    if (!cart) {
      return res.status(403).send('Unauthorized to edit this item');
    }

    item.quantity = quantity;
    await item.save();

    res.redirect('/cart');
  } catch (error) {
    console.error('Error editing cart item:', error);
    res.status(500).send('Error updating item');
  }
};

// Add food item to cart
exports.addFoodItemToCart = async (req, res) => {
  try {
    const { foodId, quantity } = req.body;
    const userId = req.session.user._id;

    let cart = await Cart.findOne({ account_id: userId, is_order: false });
    if (!cart) {
      cart = new Cart({ account_id: userId, items: [], is_order: false });
    }

    let item = await Item.findOne({ food_id: foodId, cart_id: cart._id });
    if (item) {
      return res.status(400).send('This food item is already in your cart.');
    } else {
      item = new Item({ food_id: foodId, quantity: parseInt(quantity, 10), cart_id: cart._id });
      cart.items.push(item._id);
    }

    await item.save();
    await cart.save();

    res.status(200).send('Item added to cart successfully');
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).send('Error adding item to cart');
  }
};

// Xóa một mục khỏi giỏ hàng
exports.deleteCartItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.session.user._id;

    // Tìm item theo ID
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).send('Item not found');
    }

    // Tìm cart của người dùng hiện tại chứa item đó
    const cart = await Cart.findOne({ account_id: userId, items: itemId });
    if (!cart) {
      return res.status(403).send('Unauthorized to delete this item');
    }

    // Xóa item khỏi cơ sở dữ liệu
    await Item.deleteOne({ _id: itemId });

    // Cập nhật cart để loại bỏ item đó
    await Cart.updateOne({ _id: cart._id }, { $pull: { items: itemId } });

    res.status(200).send('Item deleted successfully');
  
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).send('Error deleting item');
  }
};