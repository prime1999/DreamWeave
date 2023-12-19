import mongoose from "mongoose";

const RevenueSchema = new mongoose.Schema({
	year: {
		type: Number,
		required: true,
	},
	month: {
		type: Number,
		required: true,
	},
	totalAmount: {
		type: Number,
		required: true,
	},
});

const Revenue = mongoose.model("Revenue", RevenueSchema);

export default Revenue;
