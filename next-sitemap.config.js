module.exports = {
	siteUrl: process.env.SITE_URL,
	generateRobotsTxt: true,
	// Default transformation function
	transform: async (config, path) => {
		return {
			loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
			changefreq: config.changefreq,
			priority: config.priority,
			lastmod: config.autoLastmod
				? new Date().toISOString()
				: undefined,
			alternateRefs: config.alternateRefs ?? [],
		};
	},
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: "/",
			},
			{
				userAgent: "*",
				disallow: [
					"/sign-in",
					"/sign-up",
					"/verification",
					"/orders",
					"/payment ",
					"/checkout",
				],
			},
		],
	},
	exclude: [
		"/sign-in",
		"/sign-up",
		"/verification",
		"/orders",
		"/payment ",
		"/checkout",
	],
};
