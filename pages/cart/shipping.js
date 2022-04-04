import { SERVER_URL } from "config/config";
import { toast, ToastContainer } from "react-toastify";
import { useRef, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddressItem from "@/components/AddressItem";
import AddressModal from "@/components/AddressModal";
import CardNavigation from "@/components/CardNavigation";
import CartBtnBox from "@/components/CartBtnBox";
import Header from "@/components/Header";
import ModalBox from "@/components/ModalBox";

import settingStyles from "@/styles/Settings.module.css";
import styles from "@/styles/Cart.module.css";
import Footer from "@/components/Footer";
import Link from "next/link";

export async function getServerSideProps(ctx) {
	const res = await fetch(`${SERVER_URL}/getAddress`, {
		method: "GET",
		credentials: "include",
		headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
	});
	if (res.status !== 200)
		return {
			props: { addresses: null },
		};
	const { data } = await res.json();
	return {
		props: { addresses: data },
	};
}

const Shipping = ({ addresses }) => {
	const modalRef = useRef();
	const [selectedAddress, setSelectedAddress] = useState(0);

	if (!addresses) {
		return (
			<>
				<Header />
				<div
					className="login_request_box"
					style={{ minHeight: "50vh" }}
				>
					<h3>Please log in to access this page!</h3>
					<Link href="/login" passHref>
						<button>Login Page</button>
					</Link>
				</div>
				<Footer />
			</>
		);
	}

	return (
		<>
			<Header />
			<ModalBox
				ref={modalRef}
				headerTitle="Add New Address"
				modalInnerStyle={{ width: "35vw", height: "auto" }}
			>
				<AddressModal />
			</ModalBox>
			<ToastContainer position="bottom-left" />
			<div className={styles.cart_container}>
				<CardNavigation cart={styles.done} shipping={styles.active} />

				<div className={styles.cart_card}>
					<div className={settingStyles.addressBox}>
						{addresses.map((address, ind) => {
							return (
								<AddressItem
									selectedAddress={selectedAddress}
									setSelectedAddress={setSelectedAddress}
									address={address.address}
									postalCode={address.postalCode}
									city={address.city}
									state={address.state}
									country={address.country}
									phone={address.phone}
									isDefault={address.isDefault}
									id={address._id}
									showCheckBox={true}
									key={ind}
								/>
							);
						})}
						<div
							className={settingStyles.newAddressBox}
							onClick={() => {
								modalRef.current.classList.add("active");
							}}
						>
							<AddOutlinedIcon />
							<h4>Add new address</h4>
						</div>
					</div>

					<CartBtnBox
						returnTxt="Return to cart"
						returnLink="/cart"
						continueLink={`/cart/payment/${selectedAddress}`}
						continueTxt="Continue to payment"
						boxStyle={{ paddingRight: "10px" }}
						continueValidator={(e) => {
							if (selectedAddress === 0) {
								e.preventDefault();
								toast.error(
									"Please select an address to continue..."
								);
							}
						}}
					/>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Shipping;
