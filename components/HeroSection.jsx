import styles from "@/styles/HeroSection.module.css";
import Image from "next/image";
import banner from "@/public/banner.svg";
import Fade from "react-reveal/Fade";

const HeroSection = () => {
	return (
		<>
			<section id={styles.hero_section}>
				<div className={styles.content}>
					<Fade top>
						<h1 className={styles.title}>
							Now You’re Thinking… <br /> Together We Create!
						</h1>
						<h4>
							Furniture / Construction / Interior / Renovation
						</h4>
					</Fade>
				</div>
				<div className={styles.banner}>
					<Image
						alt="banner"
						src={banner}
						placeholder="blur"
						blurDataURL="/image-blur-placeholder.png"
					></Image>
				</div>
			</section>
		</>
	);
};

export default HeroSection;
