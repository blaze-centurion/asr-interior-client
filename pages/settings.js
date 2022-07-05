import AddressItem from "@/components/AddressItem";
import AddressModal from "@/components/AddressModal";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ModalBox from "@/components/ModalBox";
import PanelLayout from "@/components/PanelLayout";
import styles from "@/styles/Settings.module.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { SERVER_URL } from "config/config";
import { useContext, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { GlobalUserContext } from "./_app";
import validator from "validator";
import axios from "axios";
import Link from "next/link";

export async function getServerSideProps(ctx) {
	const res = await fetch(`${SERVER_URL}/getUserData`, {
		method: "GET",
		credentials: "include",
		headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
	});
	if (res.status !== 200) return { props: { data: null } };

	const userData = await res.json();
	return {
		props: {
			userData: userData.data,
		},
	};
}

const Settings = ({ userData }) => {
	const modalRef = useRef();
	const { currUserInfo, setCurrUserInfo } = useContext(GlobalUserContext);
	const [userDetails, setUserDetails] = useState({
		name: "",
		phone: "",
		email: "",
		address: [],
		profilePic: "",
		password: "",
		cpassword: "",
	});
	const [editAddress, setEditAddress] = useState({
		isEditing: false,
		address: "",
		state: "",
		city: "",
		phone: "",
		postalCode: "",
		country: "",
		id: "",
	});

	useEffect(() => {
		if (!userData) {
			return;
		}

		setUserDetails({
			name: userData.name,
			phone: userData.phone,
			email: userData.email,
			address: userData.address,
			profilePic: userData.profilePic,
			password: "",
			cpassword: "",
		});
	}, [userData]);

	if (!userData) {
		return (
			<>
				<Header />
				<PanelLayout topBarTitle="Settings">
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

	const handleInput = (e) => {
		const { name, value } = e.target;
		setUserDetails((prev) => ({ ...prev, [name]: value }));
	};

	const saveBasicInfo = async (e) => {
		e.preventDefault();
		if (
			userDetails.name === currUserInfo.name &&
			userDetails.phone === currUserInfo.phone &&
			userDetails.password.length <= 0 &&
			userDetails.profilePic === userData.profilePic
		)
			return;
		if (
			userDetails.password.length > 0 &&
			userDetails.password !== userDetails.cpassword
		) {
			return toast.error("Password did not match in both fields.");
		}

		if (!validator.isMobilePhone(userDetails.phone)) {
			return toast.error("Enter a valid phone number.");
		}

		const formData = new FormData();
		formData.append("name", userDetails.name);
		formData.append("phone", userDetails.phone);
		formData.append("password", userDetails.password);
		formData.append("profilePic", userDetails.profilePic);
		const res = await axios.patch(
			`${SERVER_URL}/updateUserBasicInfo`,
			formData,
			{ withCredentials: true }
		);

		if (res.status === 200) {
			toast.success("Updated Successfully");
			setCurrUserInfo((prev) => ({
				...prev,
				name: userDetails.name,
				phone: userDetails.phone,
				email: userDetails.email,
				profilePic: res.data.data.fileUrl,
			}));
			setUserDetails((prev) => ({
				...prev,
				password: "",
				cpassword: "",
			}));
		} else {
			toast.error("Something went wrong. Please try again.");
		}
	};

	const changeEmail = async (e) => {
		e.preventDefault();
		if (currUserInfo.email !== userDetails.email) {
			if (!validator.isEmail(userDetails.email)) {
				return toast.error("Enter a valid email.");
			}
			const res = await fetch(`${SERVER_URL}/updateUserEmail`, {
				method: "PATCH",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: userDetails.email }),
			});

			if (res.status === 200) {
				toast.success("Email Updated Successfully");
			} else {
				toast.error("Something went wrong. Please try again.");
			}
		}
	};

	return (
		<>
			<Header />
			<ToastContainer position="bottom-left" />
			<ModalBox
				ref={modalRef}
				headerTitle="Add New Address"
				modalInnerStyle={{ width: "35vw", height: "auto" }}
				setEditAddress={setEditAddress}
			>
				<AddressModal
					isEditing={editAddress.isEditing}
					addressProp={editAddress.address}
					stateProp={editAddress.state}
					cityProp={editAddress.city}
					phoneProp={editAddress.phone}
					postalCodeProp={editAddress.postalCode}
					countryProp={editAddress.country}
					id={editAddress.id}
				/>
			</ModalBox>
			<PanelLayout topBarTitle="Settings">
				<Card title="Basic Info" cardStyle={{ margin: "15px" }}>
					<form
						className={styles.input_container}
						onSubmit={saveBasicInfo}
					>
						<div className={styles.form_group}>
							<label>Your Name</label>
							<input
								type="text"
								name="name"
								value={userDetails.name}
								onChange={handleInput}
								placeholder="Your Name"
							/>
						</div>
						<div className={styles.form_group}>
							<label>Your Phone</label>
							<input
								type="text"
								name="phone"
								value={userDetails.phone}
								onChange={handleInput}
								placeholder="Your Phone"
							/>
						</div>
						<div className={styles.form_group}>
							<label>Your Photo</label>
							<div className={styles.profilePicBox}>
								<span>
									<input
										type="file"
										onChange={(e) =>
											setUserDetails((prev) => {
												let file = e.target.files[0];
												if (!file) return prev;
												return {
													...prev,
													profilePic: file,
												};
											})
										}
									/>
									Browse File
								</span>
							</div>
						</div>
						<div className={styles.form_group}>
							<label>Your Password</label>
							<input
								type="text"
								name="password"
								value={userDetails.password}
								onChange={handleInput}
								placeholder="New Password"
							/>
						</div>
						<div className={styles.form_group}>
							<label>Confirm Password</label>
							<input
								type="text"
								name="cpassword"
								value={userDetails.cpassword}
								onChange={handleInput}
								placeholder="Confirm Password"
							/>
						</div>
						<input type="submit" value="Update Profile" />
					</form>
				</Card>
				<Card title="Address" cardStyle={{ margin: "15px" }}>
					<div className={styles.addressBox}>
						{userDetails.address.map((val, ind) => (
							<AddressItem
								key={ind}
								address={val.address}
								postalCode={val.postalCode}
								city={val.city}
								state={val.state}
								country={val.country}
								phone={val.phone}
								isDefault={val.isDefault}
								id={val._id}
								ref={modalRef}
								setEditAddress={setEditAddress}
							/>
						))}
						<div
							className={styles.newAddressBox}
							onClick={() => {
								modalRef.current.classList.add("active");
							}}
						>
							<AddOutlinedIcon />
							<h4>Add new address</h4>
						</div>
					</div>
				</Card>
				<Card title="Change your email" cardStyle={{ margin: "15px" }}>
					<form
						className={styles.input_container}
						onSubmit={changeEmail}
					>
						<div className={styles.form_group}>
							<label>Your Email</label>
							<input
								type="email"
								name="email"
								value={userDetails.email}
								onChange={handleInput}
								placeholder="Your Email"
							/>
						</div>
						<input type="submit" value="Update Email" />
					</form>
				</Card>
			</PanelLayout>
			<Footer />
		</>
	);
};

export default Settings;
