import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PanelLayout from "@/components/PanelLayout";
import WorkingPage from "@/components/WorkingPage";

const Notifications = () => {
	return (
		<>
			<Header />
			<PanelLayout topBarTitle="Notifications">
				<WorkingPage />
			</PanelLayout>
			<Footer />
		</>
	);
};

export default Notifications;
