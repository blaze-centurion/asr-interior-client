import styles from "@/styles/Notifications.module.css";
import Image from "next/image";

const NotificationItem = ({ logo, alt, userName, date, title, desc }) => {
	return (
		<>
			<div className={styles.notificationBox}>
				<div className={styles.userDetailBox}>
					<div
						style={{
							position: "relative",
							width: "55px",
							height: "55px",
						}}
					>
						<Image src={logo} alt={alt} layout="fill" />
					</div>
					<div className={styles.detailBox}>
						<h3 className={styles.userName}>{userName}</h3>
						<h4 className={styles.date}>{date}</h4>
					</div>
				</div>
				<div className={styles.contentBox}>
					<h3 className={styles.notificationTitle}>{title}</h3>
					<p className={styles.notificationContent}>{desc}</p>
				</div>
			</div>
		</>
	);
};

export default NotificationItem;
