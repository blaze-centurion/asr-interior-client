import styles from "@/styles/Gallery.module.css";
import axios from "axios";
import { SERVER_URL } from "config/config";
import { useEffect, useState } from "react";
import GalleryItem from "./GalleryItem";

const GallerySection = () => {
	const [data, setData] = useState([]);

	useEffect(async () => {
		const res = await axios.get(`${SERVER_URL}/getProducts/10`);
		setData(res.data.data);
	}, []);

	return (
		<>
			<section id="services" className={styles.gallery_section}>
				<h1 className="section_title">Gallery</h1>
				<div className={styles.gallery_section_content}>
					{data.map((product, ind) => {
						return (
							<GalleryItem
								url={product.variations[0].images[0].url}
								id={product._id}
								key={ind}
								slug={product.slug}
								pName={product.productName}
								basePrice={product.basePrice}
								discountedPrice={product.discountedPrice}
							/>
						);
					})}
					{/* <GalleryItem url="https://firebasestorage.googleapis.com/v0/b/asr-interiors-20927.appspot.com/o/images%2Ffurniture3.jpg?alt=media&token=ca7b2092-dce7-4155-a174-177dfdd3ac98" />
					<GalleryItem url="https://firebasestorage.googleapis.com/v0/b/asr-interiors-20927.appspot.com/o/images%2Ffurniture3.jpg?alt=media&token=ca7b2092-dce7-4155-a174-177dfdd3ac98" />
					<GalleryItem url="https://firebasestorage.googleapis.com/v0/b/asr-interiors-20927.appspot.com/o/images%2Ffurniture3.jpg?alt=media&token=ca7b2092-dce7-4155-a174-177dfdd3ac98" />
					<GalleryItem url="https://firebasestorage.googleapis.com/v0/b/asr-interiors-20927.appspot.com/o/images%2Ffurniture3.jpg?alt=media&token=ca7b2092-dce7-4155-a174-177dfdd3ac98" />
					<GalleryItem url="https://firebasestorage.googleapis.com/v0/b/asr-interiors-20927.appspot.com/o/images%2Ffurniture3.jpg?alt=media&token=ca7b2092-dce7-4155-a174-177dfdd3ac98" />
					<GalleryItem url="https://firebasestorage.googleapis.com/v0/b/asr-interiors-20927.appspot.com/o/images%2Ffurniture3.jpg?alt=media&token=ca7b2092-dce7-4155-a174-177dfdd3ac98" /> */}
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						padding: "10px",
					}}
				>
					<button className="show_more_btn">Show More</button>
				</div>
			</section>
		</>
	);
};

export default GallerySection;
