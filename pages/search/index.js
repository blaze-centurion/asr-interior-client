import Header from "@/components/Header";
import styles from "@/styles/Gallery.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Footer from "@/components/Footer";
import GalleryItem from "@/components/GalleryItem";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SERVER_URL } from "config/config";

export async function getServerSideProps(ctx) {
	const res = await fetch(`${SERVER_URL}/searchProduct/${ctx.query.q}`, {
		method: "GET",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});
	const data = await res.json();
	return {
		props: { products: data.data },
	};
}

const Search = ({ products }) => {
	const router = useRouter();
	const searchQuery = router.query.q;
	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		setSearchInput(searchQuery ? searchQuery : "");
	}, [router.query, setSearchInput, searchQuery]);

	return (
		<>
			<Header />
			<section className={styles.gallery_container}>
				<h1
					className={styles.gallery_title}
					style={{ marginTop: "20px", fontSize: "1.4rem" }}
				>
					You Searched For:{" "}
					{searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)}
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

export default Search;
