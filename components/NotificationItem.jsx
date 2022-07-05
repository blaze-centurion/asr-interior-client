import styles from "@/styles/Notifications.module.css";

const NotificationItem = ({ date, msg, seen }) => {
	return (
		<>
			<li>
				<p
					className={styles.message}
					dangerouslySetInnerHTML={{ __html: msg }}
				></p>
				<p className={styles.date}>{date}</p>
				{!seen && <span className={styles.indicator}></span>}
			</li>
		</>
	);
};

export default NotificationItem;
