import AdminPanelLayout from "@/components/AdminPanelLayout";
import gridStyles from "@/styles/AdminPanel/NewProduct.module.css";
import styles from "@/styles/AdminPanel/Product.module.css";
import { useState } from "react";

const Notifications = () => {
	const [notificationMessage, setNotificationMessage] = useState("");

	return (
		<>
			<AdminPanelLayout>
				<div
					className={gridStyles.product_grid_container}
					style={{ gridTemplateColumns: "1fr 1fr" }}
				>
					<div className={gridStyles.left_col}>
						<div
							className={styles.admin_panel_card}
							style={{ margin: "10px 0" }}
						>
							<div className={styles.admin_panel_card_header}>
								<h1>All Notifications</h1>
							</div>
							<div className={styles.admin_panel_card_content}>
								<ul
									className={styles.admin_panel_notifications_box}
								>
									<li
										className={styles.admin_panel_notifications_box_item}
									>
										<h3>
											Order code: 20210520-10563650 has
											been Delivered
										</h3>
										<p>March 24 2022, 9:38 am</p>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className={gridStyles.right_col}>
						<div className={gridStyles.card}>
							<div className={gridStyles.card_header}>
								<h1>Send New Notification</h1>
							</div>
							<div className={gridStyles.card_content}>
								<ul className={gridStyles.card_input_item}>
									<li>
										<label>Message</label>
										<textarea
											placeholder="Message"
											value={notificationMessage}
											onChange={(e) =>
												setNotificationMessage(
													e.target.value
												)
											}
										/>
									</li>
									<div className={gridStyles.btn_box}>
										<button>Send New Notification</button>
									</div>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</AdminPanelLayout>
		</>
	);
};

export default Notifications;
