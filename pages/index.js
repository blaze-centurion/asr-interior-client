import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import WhyUsSection from "@/components/WhyUsSection";
import WWHDSection from "@/components/WWHDSection";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header";

const Index = () => {
	return (
		<>
			<ToastContainer position="bottom-left" />
			<Header />
			<HeroSection />
			<Services />
			<WWHDSection />
			<WhyUsSection />
			<GallerySection />
			<Contact />
			<Footer />
		</>
	);
};

export default Index;
