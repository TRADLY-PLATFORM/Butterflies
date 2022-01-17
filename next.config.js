 module.exports = {
		images: {
			domains: [
				"storage.googleapis.com",
				"tradly-paas-sandbox.s3.amazonaws.com",
				"tradly-paas.s3.amazonaws.com",
				"media.tradly.app",
				"media-sandbox.tradly.app"
			],
		},
		env: {
			ENVIRONMENT: process.env.ENVIRONMENT,
			BASE_URL:process.env.BASE_URL,
			API_KEY: process.env.API_KEY,
			SITE_URL: process.env.SITE_URL,
		},
 };
