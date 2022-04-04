import styles from "@/styles/Services.module.css";
import renovation from "@/public/renovation.png";
import tools from "@/public/tools.png";
import construction from "@/public/construction.png";
import interior from "@/public/interior.png";
import Image from "next/image";
import Fade from "react-reveal/Fade";

const Services = () => {
	return (
		<>
			<section id="services" className={styles.service_section}>
				<h1 className="section_title">What We Do?</h1>
				<div className={styles.service_section_content}>
					<Fade top>
						<div className={styles.service_card}>
							<div className={styles.imgBox}>
								<Image src={tools} alt="Furnitures" />
							</div>
							<h3>Furnitures</h3>
							<p>Good house always need best furniture!</p>
						</div>
					</Fade>
					<Fade top>
						<div className={styles.service_card}>
							<div className={styles.imgBox}>
								<Image src={construction} alt="Construction" />
							</div>
							<h3>Construction</h3>
							<p>Build your dream house by professionals.</p>
						</div>
					</Fade>
					<Fade top>
						<div className={styles.service_card}>
							<div className={styles.imgBox}>
								<Image src={renovation} alt="Renovation" />
							</div>
							<h3>Renovation</h3>
							<p>Customize your house with timeless elegance.</p>
						</div>
					</Fade>
					<Fade top>
						<div className={styles.service_card}>
							<div className={styles.imgBox}>
								<Image src={interior} alt="Interior" />
							</div>
							<h3>Interior</h3>
							<p>We design spaces to make lives better.</p>
						</div>
					</Fade>
				</div>
			</section>
		</>
	);
};

export default Services;
