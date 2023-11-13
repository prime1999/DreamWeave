/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["poppins", "sans-serif"],
				cour: ["Courgette", "cursive"],
				kenia: ["Kenia", "sans-serif"],
			},
			colors: {
				black: "#2F414F",
				blue: "#3894A3",
				light: "#FIF1EF",
				other: "#C7DAD4",
			},
		},
	},
	plugins: [],
};
