module.exports = {
	purge: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontSize: {
				"c-40":["40px","49px"]
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
