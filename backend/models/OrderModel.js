import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the order schema
const orderSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		items: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
		itemsPrice: {
			type: Number,
			required: true,
		},
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			zipCode: { type: String, required: true },
			country: { type: String, required: true },
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},
		shippingPrice: {
			type: Number,
			default: 0,
		},
		taxPrice: {
			type: Number,
			default: 0,
		},
		totalAmount: {
			type: Number,
		},
		isPaid: {
			type: Boolean,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		status: {
			type: String,
			enum: ["pending", "processing", "shipped", "delivered"],
			default: "pending",
		},
	},
	{
		timestamps: true,
	}
);

// Define the order model
const Order = mongoose.model("Order", orderSchema);

// Export the model
export default Order;
