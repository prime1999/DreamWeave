import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/api": "http://localhost:6000",
			"/uploads": "http://localhost:6000",
		},
	},
	plugins: [react()],
	resolve: {
		alias: [
			{ find: "@", replacement: path.resolve("./src/") },
			{
				find: "@/components",
				replacement: path.resolve("./src/components/"),
			},
			{ find: "@/lib", replacement: path.resolve("./src/lib/") },
		],
	},
});
