/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: [
			"storage.googleapis.com",
			"tradly-paas-sandbox.s3.amazonaws.com",
		],
	},
	env: {
		NEXT_APP_ENVIRONMENT: "development",
		NEXT_APP_BACKEND_API_URL: process.env.NEXT_APP_BACKEND_API_URL,
		NEXT_APP_BUSINESS_NAME: process.env.NEXT_APP_BUSINESS_NAME,
		NEXT_APP_API_KEY: process.env.NEXT_APP_API_KEY,
		NEXT_APP_DOMAIN_URL: "enter your domain url",
	},
};
