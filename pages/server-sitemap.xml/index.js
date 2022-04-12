import axios from "axios";
import { SERVER_URL } from "config/config";
import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
	const res = await axios.get(`${SERVER_URL}/getAllProductSlugs`);
	const slugs = res.data.products;
	const fields = slugs.map(({ slug }) => ({
		loc: `https://asr-interior.com/products/${slug}`,
		lastmod: new Date().toISOString(),
	}));

	return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
