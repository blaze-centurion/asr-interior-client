import styles from "@/styles/Gallery.module.css";
import GalleryItem from "./GalleryItem";

const GallerySection = () => {
	return (
		<>
			<section id="services" className={styles.gallery_section}>
				<h1 className="section_title">Gallery</h1>
				<div className={styles.gallery_section_content}>
					<GalleryItem url="https://firebasestorage.googleapis.com/v0/b/asr-interiors-20927.appspot.com/o/images%2Ffurniture3.jpg?alt=media&token=ca7b2092-dce7-4155-a174-177dfdd3ac98" />
					<GalleryItem url="https://firebasestorage.googleapis.com/v0/b/asr-interiors-20927.appspot.com/o/images%2Ffurniture3.jpg?alt=media&token=ca7b2092-dce7-4155-a174-177dfdd3ac98" />
					<GalleryItem url="https://firebasestorage.googleapis.com/v0/b/asr-interiors-20927.appspot.com/o/images%2Ffurniture3.jpg?alt=media&token=ca7b2092-dce7-4155-a174-177dfdd3ac98" />
					<GalleryItem url="https://firebasestorage.googleapis.com/v0/b/asr-interiors-20927.appspot.com/o/images%2Ffurniture3.jpg?alt=media&token=ca7b2092-dce7-4155-a174-177dfdd3ac98" />
					<GalleryItem url="https://firebasestorage.googleapis.com/v0/b/asr-interiors-20927.appspot.com/o/images%2Ffurniture3.jpg?alt=media&token=ca7b2092-dce7-4155-a174-177dfdd3ac98" />
					<GalleryItem url="https://firebasestorage.googleapis.com/v0/b/asr-interiors-20927.appspot.com/o/images%2Ffurniture3.jpg?alt=media&token=ca7b2092-dce7-4155-a174-177dfdd3ac98" />
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
