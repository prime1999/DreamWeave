const products = [
	{
		name: "Google Pixel 6",
		image: "/images/d1.png",
		description:
			"The Google Pixel 6 boasts a powerful camera, pure Android experience, and impressive AI capabilities.",
		brand: "Google",
		category: ["smartphones"],
		price: 899.99,
		countInStock: 12,
		rating: 4.6,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "HP Spectre x360",
		image: "/images/d2.png",
		description:
			"The HP Spectre x360 is a premium 2-in-1 laptop with a sleek design, stunning display, and high-performance specifications.",
		brand: "HP",
		category: ["laptops"],
		price: 1499.99,
		countInStock: 6,
		rating: 4.9,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Garmin Fenix 6",
		image: "/images/d3.png",
		description:
			"The Garmin Fenix 6 is a rugged smartwatch designed for outdoor enthusiasts, featuring advanced fitness tracking and navigation tools.",
		brand: "Garmin",
		category: ["wearable tech"],
		price: 599.99,
		countInStock: 18,
		rating: 4.5,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "OnePlus 9 Pro",
		image: "/images/d4.png",
		description:
			"The OnePlus 9 Pro combines a smooth 120Hz display, Hasselblad camera system, and fast charging capabilities for an exceptional user experience.",
		brand: "OnePlus",
		category: ["smartphones"],
		price: 1099.99,
		countInStock: 8,
		rating: 4.7,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Lenovo ThinkPad X1 Carbon",
		image: "/images/d5.png",
		description:
			"The Lenovo ThinkPad X1 Carbon is a business-class laptop known for its durability, impressive keyboard, and high-resolution display.",
		brand: "Lenovo",
		category: ["laptops"],
		price: 1299.99,
		countInStock: 10,
		rating: 4.8,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Samsung Galaxy Watch 4",
		image: "/images/d6.png",
		description:
			"The Samsung Galaxy Watch 4 is a stylish and feature-rich smartwatch with advanced health and fitness tracking capabilities.",
		brand: "Samsung",
		category: ["Wearable Tech"],
		price: 329.99,
		countInStock: 14,
		rating: 4.4,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "iPhone 13 Pro",
		image: "/images/d7.png",
		description:
			"The iPhone 13 Pro features a ProMotion display, A15 Bionic chip, and a professional-grade camera system for stunning photography and video.",
		brand: "Apple",
		category: ["smartphones"],
		price: 1199.99,
		countInStock: 15,
		rating: 4.9,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Asus ROG Zephyrus G14",
		image: "/images/d8.png",
		description:
			"The Asus ROG Zephyrus G14 is a gaming laptop with a powerful AMD Ryzen processor, NVIDIA GeForce RTX graphics, and a compact form factor.",
		brand: "Asus",
		category: ["laptops", "gaming"],
		price: 1599.99,
		countInStock: 7,
		rating: 4.7,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Fitbit Sense",
		image: "/images/d9.png",
		description:
			"The Fitbit Sense is an advanced health smartwatch with EDA and ECG sensors, stress tracking, and built-in GPS for fitness enthusiasts.",
		brand: "Fitbit",
		category: ["wearable tech"],
		price: 299.99,
		countInStock: 20,
		rating: 4.3,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Xiaomi Mi 11",
		image: "/images/d10.png",
		description:
			"The Xiaomi Mi 11 features a high-refresh-rate display, Snapdragon 888 processor, and a versatile camera setup for a flagship experience.",
		brand: "Xiaomi",
		category: ["smartphones"],
		price: 799.99,
		countInStock: 13,
		rating: 4.5,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Acer Predator Helios 300",
		image: "/images/d11.png",
		description:
			"The Acer Predator Helios 300 is a gaming laptop with a high-refresh-rate display, powerful GPU, and advanced cooling for immersive gaming.",
		brand: "Acer",
		category: ["laptops", "gaming"],
		price: 1299.99,
		countInStock: 9,
		rating: 4.6,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Huawei Watch GT 3",
		image: "/images/d12.png",
		description:
			"The Huawei Watch GT 3 combines stylish design with long battery life, fitness tracking, and a variety of health monitoring features.",
		brand: "Huawei",
		category: ["wearable tech"],
		price: 249.99,
		countInStock: 16,
		rating: 4.2,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Sony Xperia 1 III",
		image: "/images/d13.png",
		description:
			"The Sony Xperia 1 III features a 4K HDR OLED display, a triple camera system with ZEISS optics, and exceptional audio capabilities.",
		brand: "Sony",
		category: ["smartphones"],
		price: 1099.99,
		countInStock: 11,
		rating: 4.7,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Microsoft Surface Laptop 4",
		image: "/images/d14.png",
		description:
			"The Microsoft Surface Laptop 4 is a sleek and powerful ultrabook with a high-resolution PixelSense touchscreen and long-lasting battery life.",
		brand: "Microsoft",
		category: ["laptops"],
		price: 1399.99,
		countInStock: 5,
		rating: 4.8,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Amazfit GTR 3",
		image: "/images/d15.png",
		description:
			"The Amazfit GTR 3 is a stylish and affordable smartwatch with a vibrant AMOLED display, long battery life, and comprehensive health tracking features.",
		brand: "Amazfit",
		category: ["wearable tech"],
		price: 179.99,
		countInStock: 22,
		rating: 4.4,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Motorola Edge+",
		image: "/images/d16.png",
		description:
			"The Motorola Edge+ features a curved waterfall display, a powerful Snapdragon processor, and a versatile camera system for capturing stunning moments.",
		brand: "Motorola",
		category: ["smartphones"],
		price: 999.99,
		countInStock: 14,
		rating: 4.6,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Razer Blade 15",
		image: "/images/d17.png",
		description:
			"The Razer Blade 15 is a gaming laptop known for its sleek design, high refresh rate display, and powerful NVIDIA GeForce graphics.",
		brand: "Razer",
		category: ["laptops", "gaming"],
		price: 1899.99,
		countInStock: 7,
		rating: 4.9,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Fossil Gen 6",
		image: "/images/d18.png",
		description:
			"The Fossil Gen 6 is a stylish smartwatch with Wear OS, heart rate tracking, and customizable watch faces for a personalized experience.",
		brand: "Fossil",
		category: ["wearable tech"],
		price: 279.99,
		countInStock: 12,
		rating: 4.3,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "LG Velvet 2 Pro",
		image: "/images/d19.png",
		description:
			"The LG Velvet 2 Pro features a unique design, a vivid P-OLED display, and a capable camera system for capturing stunning photos and videos.",
		brand: "LG",
		category: ["smartphones"],
		price: 899.99,
		countInStock: 9,
		rating: 4.5,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Dell Alienware m15 R5",
		image: "/images/d20.png",
		description:
			"The Dell Alienware m15 R5 is a high-performance gaming laptop with AMD Ryzen processors, NVIDIA RTX graphics, and Alienware's iconic design.",
		brand: "Dell",
		category: ["laptops", "gaming"],
		price: 1799.99,
		countInStock: 11,
		rating: 4.7,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Logitech MX Master 3",
		image: "/images/d21.png",
		description:
			"The Logitech MX Master 3 is an advanced wireless mouse with ergonomic design, customizable buttons, and precise scrolling capabilities.",
		brand: "Logitech",
		category: ["mouse", "computer accessories", "gaming"],
		price: 99.99,
		countInStock: 25,
		rating: 4.7,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Sony PlayStation 5",
		image: "/images/d22.png",
		description:
			"The Sony PlayStation 5 is a next-gen gaming console offering stunning graphics, lightning-fast load times, and an immersive gaming experience.",
		brand: "Sony",
		category: ["play station", "gaming console", "gaming"],
		price: 499.99,
		countInStock: 10,
		rating: 4.8,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Apple MacBook Pro 16-inch",
		image: "/images/d23.png",
		description:
			"The Apple MacBook Pro 16-inch is a powerful laptop featuring the latest M1 Pro chip, exceptional display quality, and long battery life.",
		brand: "Apple",
		category: ["laptops"],
		price: 2499.99,
		countInStock: 5,
		rating: 4.9,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "IPhone 15 pro max",
		image: "/images/d24.png",
		description:
			"The Apple titanium IPhone 15 pro max featuring the latest M1 Pro chip, exceptional display quality, and long battery life.",
		brand: "Apple",
		category: ["smartphones"],
		price: 1599.99,
		countInStock: 25,
		rating: 4.9,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Samsung Galaxy Tab S7",
		image: "/images/d25.png",
		description:
			"The Samsung Galaxy Tab S7 is a high-performance tablet with a stunning display, S Pen support, and powerful multitasking capabilities.",
		brand: "Samsung",
		category: ["tablet"],
		price: 649.99,
		countInStock: 20,
		rating: 4.6,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Bose QuietComfort 35 II",
		image: "/images/d26.png",
		description:
			"The Bose QuietComfort 35 II are noise-cancelling headphones that deliver superior sound quality and comfort for all-day listening.",
		brand: "Bose",
		category: ["Headphones", "computer accessories", "gaming"],
		price: 299.99,
		countInStock: 15,
		rating: 4.7,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Dell Ultrasharp U2720Q",
		image: "/images/d27.png",
		description:
			"The Dell Ultrasharp U2720Q is a 27-inch 4K monitor offering precise color accuracy and extensive connectivity options for professionals.",
		brand: "Dell",
		category: ["monitors", "computer accessories", "gaming"],
		price: 699.99,
		countInStock: 8,
		rating: 4.8,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Razer BlackWidow V3",
		image: "/images/d28.png",
		description:
			"The Razer BlackWidow V3 is a mechanical gaming keyboard known for its durable switches, customizable RGB lighting, and responsive performance.",
		brand: "Razer",
		category: ["keyboards", "computer accessories", "gaming"],
		price: 129.99,
		countInStock: 30,
		rating: 4.5,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Canon EOS R6",
		image: "/images/d29.png",
		description:
			"The Canon EOS R6 is a versatile full-frame mirrorless camera offering high-speed performance, excellent image quality, and advanced autofocus.",
		brand: "Canon",
		category: ["camera", "computer accessories"],
		price: 2499.99,
		countInStock: 7,
		rating: 4.8,
		numReviews: 0,
		reviews: [],
	},
	{
		name: "Google Nest Hub Max",
		image: "/images/d30.png",
		description:
			"The Google Nest Hub Max is a smart display with a built-in Google Assistant, offering hands-free control, video calling, and smart home integration.",
		brand: "Google",
		category: ["Smart Home"],
		price: 229.99,
		countInStock: 12,
		rating: 4.6,
		numReviews: 0,
		reviews: [],
	},
];

export default products;
