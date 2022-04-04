import styles from "@/styles/Dashboard.module.css";
import cardBg from "@/public/cardBg.svg";
import Image from "next/image";

const BadgeCard = ({ title, number, bgColorStyle }) => {
	return (
		<div className={styles.badge_card} style={bgColorStyle}>
			<div className={styles.content}>
				<h3>{number}</h3>
				<h5>{title}</h5>
			</div>
			<div
				style={{
					position: "absolute",
					bottom: "-10px",
				}}
			>
				<Image
					src={cardBg}
					className={styles.img}
					alt="Card Background"
				/>
			</div>
		</div>
	);
};

export default BadgeCard;
