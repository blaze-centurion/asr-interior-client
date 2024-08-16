// const siteUrl = "https://asr-interior.com";
const siteUrl = "https://asr-interior.netlify.app";

module.exports = {
	siteUrl,
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [
			{ userAgent: "*", disallow: "/admin/*" },
			{ userAgent: "*", allow: "/" },
		],
		additionalSitemaps: [
			`${siteUrl}/sitemap.xml`,
			`${siteUrl}/sitemap-0.xml`,
			`${siteUrl}/server-sitemap.xml`,
		],
	},
	exclude: ["/admin/*"],
};
