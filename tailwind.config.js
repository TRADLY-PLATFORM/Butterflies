const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	mode: "jit",
	purge: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontSize: {
				"c-40": ["40px", "49px"],
			},
			boxShadow: {
				"c-sm": "0px 8px 28px rgba(0, 0, 0, 0.07)",
				"c-xsm": "0px 1px 2px rgba(0, 0, 0, 0.24)",
			},
		},
		colors: {
			primary: "var( --primary_color)",
			primary_light: "#DFFBF4",
			secondary: "#959393",
			transparent: "transparent",
			current: "currentColor",
			black: colors.black,
			white: colors.white,
			gray: colors.trueGray,
			indigo: colors.indigo,
			red: colors.red,
			yellow: colors.amber,
			rose: colors.rose,
			orange: colors.orange,
			green: colors.green,
			blue: colors.blue,
		},
		borderRadius: {
			"c-48": "48px",
			none: "0",
			sm: "0.125rem",
			DEFAULT: "0.25rem",
			md: "0.375rem",
			lg: "0.5rem",
			xl: "16px",
			full: "9999px",
		},
		screens: {
			xs: "540px",
			ms: "450px",
			xxs: "350px",
			"c-lg": "1100px",
			"c-md": "824px",

			...defaultTheme.screens,
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
	],
};
