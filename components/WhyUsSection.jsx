import styles from "@/styles/WWHD_WCU_Section.module.css";
import guarantee from "@/public/guarantee.png";
import installment from "@/public/install.png";
import quality from "@/public/quality.png";
import delivery from "@/public/shipped.png";
import Image from "next/image";
import Fade from "react-reveal/Fade";

const WhyUsSection = () => {
	return (
		<>
			<div className={styles.section_container}>
				<h3 className="section_title" style={{ marginBottom: "0" }}>
					Why choose us?
				</h3>
				<div className={`${styles.item_container} ${styles.whyus_item_container}`}>
					<Fade left>
						<div className={styles.item}>
							<Image
								src={delivery}
								alt="Free Delivery"
								width={50}
								height={50}
							/>
							<h3>Free Delivery</h3>
						</div>
						<div className={styles.item}>
							<Image
								src={installment}
								alt="Free Installation"
								width={50}
								height={50}
							/>
							<h3>Free Installation</h3>
						</div>
						<div className={styles.item}>
							<Image
								src={quality}
								alt="Top Quality Work"
								width={50}
								height={50}
							/>
							<h3>Top Quality Work</h3>
						</div>
						<div className={styles.item}>
							<Image
								src={guarantee}
								alt="Years of guarantee"
								width={50}
								height={50}
							/>
							<h3>Years of guarantee</h3>
						</div>
					</Fade>
				</div>
			</div>
		</>
	);
};

export default WhyUsSection;
