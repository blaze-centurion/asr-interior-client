import { SERVER_URL } from "config/config";
import { useState } from "react";
import axios from "axios";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ProductDescTab from "@/components/ProductDescTab";
import ProductInfoCard from "@/components/ProductInfoCard";
import ProductReviewsTab from "@/components/ProductReviewsTab";
import TopSellingProductItem from "@/components/TopSellingProductItem";
import { useRouter } from "next/router";

import styles from "@/styles/Product.module.css";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

export async function getServerSideProps(ctx) {
	const res = await axios.get(`${SERVER_URL}/getProduct/${ctx.query.slug}`);
	return {
		props: {
			data: res.data.data,
		},
	};
}

const Product = ({ data }) => {
	const [tab, setTab] = useState({
		descActive: true,
		reviewActive: false,
		component: <ProductDescTab desc={data.desc} />,
	});
	const { slug } = useRouter().query;

	const breadcrumbs = [
		<Link key="1" href="/">
			<a className="breadcrumbs_link">Home</a>
		</Link>,
		<Link key="2" href="/gallery">
			<a className="breadcrumbs_link">Gallery</a>
		</Link>,
		<Link key="3" href={`/products/${slug}`}>
			<a className="breadcrumbs_link active">{decodeURI(slug)}</a>
		</Link>,
	];

	return (
		<>
			<Header />
			<Head>
				<title>{data.metaTitle} - ASR Interiors</title>
			</Head>
			<Breadcrumbs
				separator={<NavigateNextIcon fontSize="small" />}
				style={{ padding: "1rem 5rem 0 4rem", fontSize: "14px" }}
				aria-label="breadcrumb"
			>
				{breadcrumbs}
			</Breadcrumbs>
			<ToastContainer position="bottom-left" />
			<div className={styles.product_container}>
				<ProductInfoCard data={data} />
				<div className={styles.more_details_container}>
					<div className={styles.flex05}>
						<div className={styles.product_card}>
							<div className={styles.product_card_header}>
								<h2>Top Selling Products</h2>
							</div>
							<div
								className={
									styles.product_card_content_container
								}
							>
								<ul className={styles.product_item_box}>
									<TopSellingProductItem
										src="https://www.ulcdn.net/images/products/240656/slide/1332x726/Stanhope_hydraulic_bed_01.jpg?1548312916"
										pName="Chelsea Adjustable Sectional Sofa"
										basePrice="₹96,499"
										discountedPrice="₹67,5499"
										alt="Product Name"
									/>
								</ul>
							</div>
						</div>
					</div>
					<div className={styles.flex15}>
						<div
							className={`${styles.product_card} ${styles.tabPane}`}
						>
							<div className={styles.tabHeader}>
								<ul>
									<li
										className={
											tab.descActive
												? styles.active
												: "null"
										}
										onClick={() =>
											setTab(() => ({
												descActive: true,
												reviewActive: false,
												component: (
													<ProductDescTab
														desc={data.desc}
													/>
												),
											}))
										}
									>
										Description
									</li>
									<li
										className={
											tab.reviewActive
												? styles.active
												: "null"
										}
										onClick={() =>
											setTab(() => ({
												descActive: false,
												reviewActive: true,
												component: (
													<ProductReviewsTab
														reviews={data.reviews}
														pid={data._id}
													/>
												),
											}))
										}
									>
										Reviews
									</li>
								</ul>
							</div>
							<div className={styles.tabContent}>
								{tab.component}
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Product;
