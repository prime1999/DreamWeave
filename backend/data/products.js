const products = [
	{
		name: "Google Pixel 6",
		image: "/images/d1.jpg",
		description:
			"The Google Pixel 6 boasts a powerful camera, pure Android experience, and impressive AI capabilities.",
		brand: "Google",
		category: "Smartphones and Accessories",
		price: 899.99,
		countInStock: 12,
		rating: 4.6,
		numReviews: 25,
	},
	{
		name: "HP Spectre x360",
		image: "/images/d2.jpg",
		description:
			"The HP Spectre x360 is a premium 2-in-1 laptop with a sleek design, stunning display, and high-performance specifications.",
		brand: "HP",
		category: "Laptops and Computer Components",
		price: 1499.99,
		countInStock: 6,
		rating: 4.9,
		numReviews: 22,
	},
	{
		name: "Garmin Fenix 6",
		image: "/images/d3.jpg",
		description:
			"The Garmin Fenix 6 is a rugged smartwatch designed for outdoor enthusiasts, featuring advanced fitness tracking and navigation tools.",
		brand: "Garmin",
		category: "Wearable Tech",
		price: 599.99,
		countInStock: 18,
		rating: 4.5,
		numReviews: 15,
	},
	{
		name: "OnePlus 9 Pro",
		image: "/images/d4.jpg",
		description:
			"The OnePlus 9 Pro combines a smooth 120Hz display, Hasselblad camera system, and fast charging capabilities for an exceptional user experience.",
		brand: "OnePlus",
		category: "Smartphones and Accessories",
		price: 1099.99,
		countInStock: 8,
		rating: 4.7,
		numReviews: 30,
	},
	{
		name: "Lenovo ThinkPad X1 Carbon",
		image: "/images/d5.jpg",
		description:
			"The Lenovo ThinkPad X1 Carbon is a business-class laptop known for its durability, impressive keyboard, and high-resolution display.",
		brand: "Lenovo",
		category: "Laptops and Computer Components",
		price: 1299.99,
		countInStock: 10,
		rating: 4.8,
		numReviews: 18,
	},
	{
		name: "Samsung Galaxy Watch 4",
		image: "/images/d6.jpg",
		description:
			"The Samsung Galaxy Watch 4 is a stylish and feature-rich smartwatch with advanced health and fitness tracking capabilities.",
		brand: "Samsung",
		category: "Wearable Tech",
		price: 329.99,
		countInStock: 14,
		rating: 4.4,
		numReviews: 20,
	},
	{
		name: "iPhone 13 Pro",
		image: "/images/d7.png",
		description:
			"The iPhone 13 Pro features a ProMotion display, A15 Bionic chip, and a professional-grade camera system for stunning photography and video.",
		brand: "Apple",
		category: "Smartphones and Accessories",
		price: 1199.99,
		countInStock: 15,
		rating: 4.9,
		numReviews: 28,
	},
	{
		name: "Asus ROG Zephyrus G14",
		image: "/images/d8.jpg",
		description:
			"The Asus ROG Zephyrus G14 is a gaming laptop with a powerful AMD Ryzen processor, NVIDIA GeForce RTX graphics, and a compact form factor.",
		brand: "Asus",
		category: "Laptops and Computer Components",
		price: 1599.99,
		countInStock: 7,
		rating: 4.7,
		numReviews: 24,
	},
	{
		name: "Fitbit Sense",
		image: "/images/d9.webp",
		description:
			"The Fitbit Sense is an advanced health smartwatch with EDA and ECG sensors, stress tracking, and built-in GPS for fitness enthusiasts.",
		brand: "Fitbit",
		category: "Wearable Tech",
		price: 299.99,
		countInStock: 20,
		rating: 4.3,
		numReviews: 16,
	},
	{
		name: "Xiaomi Mi 11",
		image: "/images/d10.jpg",
		description:
			"The Xiaomi Mi 11 features a high-refresh-rate display, Snapdragon 888 processor, and a versatile camera setup for a flagship experience.",
		brand: "Xiaomi",
		category: "Smartphones and Accessories",
		price: 799.99,
		countInStock: 13,
		rating: 4.5,
		numReviews: 21,
	},
	{
		name: "Acer Predator Helios 300",
		image: "/images/d11.webp",
		description:
			"The Acer Predator Helios 300 is a gaming laptop with a high-refresh-rate display, powerful GPU, and advanced cooling for immersive gaming.",
		brand: "Acer",
		category: "Laptops and Computer Components",
		price: 1299.99,
		countInStock: 9,
		rating: 4.6,
		numReviews: 19,
	},
	{
		name: "Huawei Watch GT 3",
		image: "/images/d12.jpg",
		description:
			"The Huawei Watch GT 3 combines stylish design with long battery life, fitness tracking, and a variety of health monitoring features.",
		brand: "Huawei",
		category: "Wearable Tech",
		price: 249.99,
		countInStock: 16,
		rating: 4.2,
		numReviews: 14,
	},
	{
		name: "Sony Xperia 1 III",
		image: "/images/d13.jpg",
		description:
			"The Sony Xperia 1 III features a 4K HDR OLED display, a triple camera system with ZEISS optics, and exceptional audio capabilities.",
		brand: "Sony",
		category: "Smartphones and Accessories",
		price: 1099.99,
		countInStock: 11,
		rating: 4.7,
		numReviews: 23,
	},
	{
		name: "Microsoft Surface Laptop 4",
		image: "/images/d14.jpg",
		description:
			"The Microsoft Surface Laptop 4 is a sleek and powerful ultrabook with a high-resolution PixelSense touchscreen and long-lasting battery life.",
		brand: "Microsoft",
		category: "Laptops and Computer Components",
		price: 1399.99,
		countInStock: 5,
		rating: 4.8,
		numReviews: 17,
	},
	{
		name: "Amazfit GTR 3",
		image: "/images/d15.jpg",
		description:
			"The Amazfit GTR 3 is a stylish and affordable smartwatch with a vibrant AMOLED display, long battery life, and comprehensive health tracking features.",
		brand: "Amazfit",
		category: "Wearable Tech",
		price: 179.99,
		countInStock: 22,
		rating: 4.4,
		numReviews: 18,
	},
	{
		name: "Motorola Edge+",
		image: "/images/d16.png",
		description:
			"The Motorola Edge+ features a curved waterfall display, a powerful Snapdragon processor, and a versatile camera system for capturing stunning moments.",
		brand: "Motorola",
		category: "Smartphones and Accessories",
		price: 999.99,
		countInStock: 14,
		rating: 4.6,
		numReviews: 26,
	},
	{
		name: "Razer Blade 15",
		image: "/images/d17.jpg",
		description:
			"The Razer Blade 15 is a gaming laptop known for its sleek design, high refresh rate display, and powerful NVIDIA GeForce graphics.",
		brand: "Razer",
		category: "Laptops and Computer Components",
		price: 1899.99,
		countInStock: 7,
		rating: 4.9,
		numReviews: 21,
	},
	{
		name: "Fossil Gen 6",
		image: "/images/d18.jpg",
		description:
			"The Fossil Gen 6 is a stylish smartwatch with Wear OS, heart rate tracking, and customizable watch faces for a personalized experience.",
		brand: "Fossil",
		category: "Wearable Tech",
		price: 279.99,
		countInStock: 12,
		rating: 4.3,
		numReviews: 15,
	},
	{
		name: "LG Velvet 2 Pro",
		image: "/images/d19.jpg",
		description:
			"The LG Velvet 2 Pro features a unique design, a vivid P-OLED display, and a capable camera system for capturing stunning photos and videos.",
		brand: "LG",
		category: "Smartphones and Accessories",
		price: 899.99,
		countInStock: 9,
		rating: 4.5,
		numReviews: 20,
	},
	{
		name: "Dell Alienware m15 R5",
		image: "/images/d20.png",
		description:
			"The Dell Alienware m15 R5 is a high-performance gaming laptop with AMD Ryzen processors, NVIDIA RTX graphics, and Alienware's iconic design.",
		brand: "Dell",
		category: "Laptops and Computer Components",
		price: 1799.99,
		countInStock: 11,
		rating: 4.7,
		numReviews: 23,
	},
];

export default products;
