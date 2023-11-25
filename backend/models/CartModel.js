import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
	items: {
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		quantity: {
			type: Number,
			default: 1,
		},
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

// Define the cart model
const Cart = mongoose.model("Cart", cartSchema);

// Export the model
export default Cart;
