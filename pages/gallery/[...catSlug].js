import Header from "@/components/Header";
import styles from "@/styles/Gallery.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import Footer from "@/components/Footer";
import GalleryItem from "@/components/GalleryItem";
import { useState } from "react";
import { useRouter } from "next/router";
import { SERVER_URL } from "config/config";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Head from "next/head";

export async function getServerSideProps(context) {
	const { catSlug } = context.query;
	const res = await fetch(
		`${SERVER_URL}/getCategoriesByPId/${catSlug[catSlug.length - 1]}`,
		{
			method: "GET",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
		}
	);
	const productRes = await fetch(
		`${SERVER_URL}/getProductsByCat/${catSlug[catSlug.length - 1]}`,
		{
			method: "GET",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
		}
	);
	return {
		props: {
			cats: (await res.json()).data,
			products: (await productRes.json()).data,
		},
	};
}

const CategoryGallery = ({ cats, products }) => {
	const router = useRouter();
	const { catSlug } = router.query;
	const [searchInput, setSearchInput] = useState("");
	const paths = router.asPath.split("/");

	return (
		<>
			<Header />
			<Head>
				<title>{catSlug[catSlug.length - 1].charAt(0).toUpperCase()+catSlug[catSlug.length - 1].substring(1)} - ASR Interiors</title>
			</Head>
			<Breadcrumbs
				separator={<NavigateNextIcon fontSize="small" />}
				className="breadcrumbs"
				aria-label="breadcrumb"
			>
				{paths.map((val, ind) => {
					const routeTo = paths.slice(0, ind + 1).join("/");
					return (
						<Link key={ind} href={`${routeTo ? routeTo : "/"}`}>
							<a
								className={`breadcrumbs_link ${
									ind === paths.length - 1
										? "active"
										: undefined
								}`}
							>
								{val ? decodeURI(val) : "Home"}
							</a>
						</Link>
					);
				})}
			</Breadcrumbs>
			<section className={styles.gallery_container}>
				<h1 className={styles.gallery_title}>
					{catSlug[catSlug.length - 1]}
				</h1>
				<h3 className={styles.gallery_pno}>
					({products.length} products)
				</h3>
				<div>
					<form
						className={`search_bar ${styles.gallery_searchbar}`}
						onSubmit={(e) => {
							e.preventDefault();
							router.push({
								pathname: "/search",
								query: { q: searchInput },
							});
						}}
					>
						<input
							type="text"
							placeholder="Search and press enter"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
						/>
						<button type="submit">
							<SearchIcon />
						</button>
					</form>

					<div className={styles.content_container}>
						<ul className="filter_container">
							{cats.map((cat, ind) => {
								let path = "";
								catSlug.forEach((val) => (path += val + "/"));
								return (
									<li className="filter_item" key={ind}>
										<Link
											href={`/gallery/${path}${cat.name.toLowerCase()}`}
										>
											<a className="active">{cat.name}</a>
										</Link>
									</li>
								);
							})}
						</ul>
						<div className={styles.products_container}>
							{products.length > 0 ? (
								products.map((product, ind) => {
									return (
										<GalleryItem
											url={
												product.variations[0].images[0].url
											}
											id={product._id}
											key={ind}
											slug={product.slug}
											pName={product.productName}
											basePrice={product.basePrice}
											discountedPrice={
												product.discountedPrice
											}
										/>
									);
								})
							) : (
								<div
									style={{
										height: "42vh",
										fontSize: "20px",
										fontWeight: "500",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									No Product Found!
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default CategoryGallery;
