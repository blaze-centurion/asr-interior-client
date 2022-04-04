import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PanelLayout from "@/components/PanelLayout";
import styles from "@/styles/Notifications.module.css";
import logo from "@/public/logo.png";
import NotificationItem from "@/components/NotificationItem";

const Notifications = () => {
	return (
		<>
			<Header />
			<PanelLayout topBarTitle="Notifications">
				<div className={styles.notifications_container}>
					<NotificationItem
						logo={logo}
						alt="ASR Interior Logo"
						userName="ASR Interior"
						date="01:36:03 08-03-2021"
						title="Jacket Blue Plain Washington"
						desc="Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. Lorem Ipsum has been
								the industry's standard dummy text ever since
								the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen
								book"
					/>
				</div>
			</PanelLayout>
			<Footer />
		</>
	);
};

export default Notifications;
