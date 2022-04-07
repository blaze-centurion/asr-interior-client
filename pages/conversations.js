import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PanelLayout from "@/components/PanelLayout";
import WorkingPage from "@/components/WorkingPage";

const Conversations = () => {
	return (
		<>
			<Header />

			<PanelLayout topBarTitle="Conversations">
				<WorkingPage />
			</PanelLayout>
			<Footer />
		</>
	);
};

export default Conversations;
