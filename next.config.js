 module.exports = {
		images: {
			domains: [
				"storage.googleapis.com",
				"tradly-paas-sandbox.s3.amazonaws.com",
			],
		},
		env: {
			NEXT_APP_ENVIRONMENT: process.env.NEXT_APP_ENVIRONMENT,
			NEXT_APP_API_KEY: process.env.NEXT_APP_API_KEY,
 			NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
				process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
		},
 };
