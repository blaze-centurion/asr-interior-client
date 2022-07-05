import Header from "@/components/Header";
import styles from "@/styles/Wishlist.module.css";
import Footer from "@/components/Footer";
import PanelLayout from "@/components/PanelLayout";
import WishlistItem from "@/components/WishlistItem";
import { SERVER_URL } from "config/config";
import { numberWithCommas } from "utils/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import pusherJs from "pusher-js";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

export async function getServerSideProps(ctx) {
	const res = await fetch(`${SERVER_URL}/wishlistProduct`, {
		method: "GET",
		credentials: "include",
		headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
	});
	if (res.status !== 200) return { props: { data: null } };

	const { data } = await res.json();
	return {
		props: { data },
	};
}

const Wishlist = ({ data }) => {
	const [wishlist, setWishlist] = useState(data);

	useEffect(() => {
		if (!wishlist) return;
		const pusher = new pusherJs("500067beb493b7501b08", {
			cluster: "ap2",
		});
		const userChannel = pusher.subscribe("users");
		userChannel.bind("update", async (change) => {
			if (change.wishlist.length !== wishlist.length) {
				const res = await axios.get(`${SERVER_URL}/wishlistProduct`, {
					withCredentials: true,
				});
				setWishlist(res.data.data);
			}
		});

		return () => {
			userChannel.unbind_all();
			userChannel.unsubscribe();
		};
	}, [wishlist]);

	if (!data) {
		return (
			<>
				<Header />
				<PanelLayout topBarTitle="Wishlist">
					<div className="login_request_box">
						<h3>Please log in to access this page!</h3>
						<Link href="/login" passHref>
							<button>Login Page</button>
						</Link>
					</div>
				</PanelLayout>
			</>
		);
	}

	return (
		<>
			<ToastContainer position="bottom-left" />

			<Header />
			<PanelLayout topBarTitle="Wishlist">
				<section className={styles.wishlist_container}>
					{wishlist.map((item, ind) => {
						return (
							<WishlistItem
								key={ind}
								id={item._id}
								src={item.variations[0].images[0].url}
								name={item.productName}
								basePrice={`₹${numberWithCommas(
									item.basePrice
								)}`}
								slug={item.slug}
								discountedPrice={`₹${numberWithCommas(
									item.discountedPrice
								)}`}
							/>
						);
					})}
				</section>
			</PanelLayout>
			<Footer />
		</>
	);
};

export default Wishlist;
