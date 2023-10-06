/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				cardGrey: "#7d8590",
				baseBG: "#0d1117",
				baseGreen: "#00df9a",
			},
		},
	},
	plugins: [],
};
