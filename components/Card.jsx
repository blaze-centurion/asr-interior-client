import styles from "@/styles/Dashboard.module.css";

const Card = ({ children, title, cardStyle }) => {
	return (
		<div className={styles.card} style={cardStyle}>
			<div className={styles.card_header}>
				<h3>{title}</h3>
			</div>
			<div className={styles.card_content}>{children}</div>
		</div>
	);
};

export default Card;
