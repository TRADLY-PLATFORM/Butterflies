 module.exports = {
		images: {
			domains: [
				"storage.googleapis.com",
				"tradly-paas-sandbox.s3.amazonaws.com",
			],
		},
		env: {
			ENVIRONMENT_NAME: process.env.ENVIRONMENT_NAME,
			API_KEY: process.env.API_KEY,
		},
 };
