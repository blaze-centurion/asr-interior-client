import Header from "@/components/Header";
import styles from "@/styles/About.module.css"

const About = () => {
	return (
		<>
			<Header />
			<div className={styles.about_container}>
				<h1 className={styles.title}>About Us</h1>
				<p>We are the team of professionals from India. We have experience of over 10 years. We always deliver the top quality work. We believe </p>
			</div>
		</>
	);
};

export default About;
