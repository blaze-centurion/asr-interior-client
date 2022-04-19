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
import axios from "axios";

export async function getServerSideProps() {
	const res = await axios.get(`${SERVER_URL}/getParentCategories`);
	const productRes = await axios.get(`${SERVER_URL}/getProducts`);
	const cats = res.data;
	return {
		props: { cats: cats.data, products: productRes.data.data },
	};
}

const Gallery = ({ cats, products }) => {
	const router = useRouter();
	const [searchInput, setSearchInput] = useState("");
	const breadcrumbs = [
		<Link key="1" href="/">
			<a className="breadcrumbs_link">Home</a>
		</Link>,
		<Link key="2" href="/gallery">
			<a className="breadcrumbs_link active">Gallery</a>
		</Link>,
	];

	return (
		<>
			<Head>
				<title>Gallery - ASR Interiors</title>
			</Head>
			<Header />
			<Breadcrumbs
				separator={<NavigateNextIcon fontSize="small" />}
				className="breadcrumbs"
				aria-label="breadcrumb"
			>
				{breadcrumbs}
			</Breadcrumbs>
			<section className={styles.gallery_container}>
				<h1 className={styles.gallery_title}>Gallery</h1>
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
								return (
									<li className="filter_item" key={ind}>
										<Link href={`/gallery/${cat.name}`}>
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
												product.variations[0].images[0]
													.url
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

export default Gallery;
