import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PanelLayout from "@/components/PanelLayout";
import styles from "@/styles/Notifications.module.css";
import NotificationItem from "@/components/NotificationItem";
import { useEffect, useState } from "react";
import axios from "axios";
import pusherJs from "pusher-js";
import { SERVER_URL } from "config/config";
import { getCurrentTime } from "utils/utils";

const Notifications = () => {
	const [notifications, setNotifications] = useState([]);
	const getNotifications = async () => {
		const res = await axios.get(`${SERVER_URL}/notifications`, {
			withCredentials: true,
		});
		if (res.status === 200) {
			setNotifications(res.data.data);
		}
	};

	useEffect(() => {
		getNotifications();
	}, []);

	useEffect(() => {
		const pusher = new pusherJs(process.env.NEXT_PUBLIC_PUSHER_KEY, {
			cluster: "ap2",
		});
		const notificationChannel = pusher.subscribe("notifications");
		notificationChannel.bind("insert", (change) => {
			setNotifications([change.notification, ...notifications]);
		});
		return () => {
			notificationChannel.unbind_all();
			notificationChannel.unsubscribe();
		};
	}, [notifications]);

	const markAllNotificationsAsRead = async () => {
		const res = await axios.patch(
			`${SERVER_URL}/seenNotifications`,
			{},
			{ withCredentials: true }
		);
		if (res.status === 200) window.location.reload();
	};

	return (
		<>
			<Header />
			<PanelLayout topBarTitle="Notifications">
				<div className={styles.container}>
					<div className={styles.header}>
						<h3>Notifications</h3>
						<button
							onClick={markAllNotificationsAsRead}
							className={styles.headerBtn}
						>
							Mark all as read
						</button>
					</div>
					<div className={styles.content}>
						<ul className={styles.notifications}>
							{notifications.map((item, i) => {
								const date = getCurrentTime(item.date);
								return (
									<NotificationItem
										key={i}
										seen={item.seen}
										msg={item.message}
										date={date}
									/>
								);
							})}
						</ul>
					</div>
				</div>
			</PanelLayout>
			<Footer />
		</>
	);
};

export default Notifications;
