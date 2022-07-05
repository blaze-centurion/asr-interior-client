import { ClipLoader } from "react-spinners";
import { createContext, useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import { SERVER_URL } from "config/config";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";

import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";

export const GlobalUserContext = createContext(0);

const GlobalContextComponent = ({ children }) => {
	const [currUserInfo, setCurrUserInfo] = useState({
		name: "",
		email: "",
		phone: "",
		profilePic: "",
		loggedIn: false,
	});
	const [authorized, setAuthorized] = useState(true);
	const router = useRouter();

	useEffect(() => {
		authCheck(router.asPath);
		const hideContent = () => setAuthorized(false);
		router.events.on("routeChangeStart", hideContent);
		router.events.on("routeChangeComplete", authCheck);

		return () => {
			router.events.off("routeChangeStart", hideContent);
			router.events.off("routeChangeComplete", authCheck);
		};
	}, []);

	const isUserLoggedIn = async (e) => {
		try {
			const res = await axios.get(`${SERVER_URL}/isUserLoggedIn`, {
				withCredentials: true,
			});
			if (res.status === 200)
				return { status: true, data: res.data.data };
			else return { status: false, data: {} };
		} catch (error) {
			return { status: false, data: {} };
		}
	};

	async function authCheck(url) {
		const privatePaths = ["admin"];
		const path = url.split("/").filter((a) => a)[0];
		const { status, data } = await isUserLoggedIn();
		if (privatePaths.includes(path)) {
			if (data.role === "admin") {
				setAuthorized(true);
				setCurrUserInfo({
					name: data.name,
					email: data.email,
					phone: data.phone,
					profilePic: data.profilePic,
					loggedIn: true,
				});
			} else {
				setAuthorized(false);
				router.push("/");
			}
		} else {
			setAuthorized(true);
			setCurrUserInfo({
				name: data.name,
				email: data.email,
				phone: data.phone,
				profilePic: data.profilePic,
				loggedIn: status,
			});
		}
	}

	return (
		<>
			{authorized ? (
				<GlobalUserContext.Provider
					value={{ currUserInfo, setCurrUserInfo }}
				>
					{children}
				</GlobalUserContext.Provider>
			) : (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						minHeight: "100vh",
					}}
				>
					<ClipLoader size="80px" color="#ff6d6d" />
				</div>
			)}
		</>
	);
};

function MyApp({ Component, pageProps }) {
	return (
		<>
			<ErrorBoundary>
				<Head>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/favicon/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon/favicon-16x16.png"
					/>
					<link rel="manifest" href="/favicon/site.webmanifest" />
					<link
						rel="mask-icon"
						href="/favicon/safari-pinned-tab.svg"
						color="#5bbad5"
					/>
					<meta name="msapplication-TileColor" content="#da532c" />
					<meta name="theme-color" content="#ffffff" />
					<meta
						name="google-site-verification"
						content="3YQVXDWqjsLXRozGPm2C6sydnhETUkF2C8wIQ-ATju0"
					/>
					<link rel="preconnect" href={SERVER_URL} />
				</Head>
				<NextSeo
					title="ASR Interiors - The Best Interior Designers and Constructor in Delhi."
					description="We are the best interior designers and constructors company in delhi. We make new furnitures, construct new houses and even renovate them into new one."
					titleTemplate="ASR Interiors - The Best Interior Designers and Constructor in Delhi."
					defaultTitle="ASR Interiors - The Best Interior Designers and Constructor in Delhi."
					noindex={false}
					nofollow={false}
				/>
				<GlobalContextComponent>
					<Component {...pageProps} />
				</GlobalContextComponent>
			</ErrorBoundary>
		</>
	);
}

export default MyApp;
