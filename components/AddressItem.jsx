import React, { useEffect, useState } from "react";
import styles from "@/styles/Settings.module.css";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { SERVER_URL } from "config/config";
import { useRouter } from "next/router";
import axios from "axios";

const AddressItem = React.forwardRef(
	(
		{
			address,
			postalCode,
			city,
			state,
			country,
			phone,
			id,
			isDefault,
			showCheckBox,
			setSelectedAddress,
			selectedAddress,
			setEditAddress,
		},
		ref
	) => {
		const [menuActive, setMenuActive] = useState(false);
		const router = useRouter();
		const [checked, setChecked] = useState(isDefault);

		useEffect(() => {
			if (isDefault && setSelectedAddress) setSelectedAddress(id);
		}, [isDefault, id]);

		const makeDefault = async () => {
			const res = await fetch(`${SERVER_URL}/makeDefaultAddress`, {
				method: "PATCH",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id }),
			});

			if (res.status === 200) {
				router.reload();
			} else {
				window.alert("Error");
			}
		};

		const deleteAddress = async () => {
			if (!window.confirm("Do you really want to delete this address?"))
				return;

			const res = await axios.patch(
				`${SERVER_URL}/deleteAddress`,
				{ id },
				{ withCredentials: true }
			);

			if (res.status === 200) {
				router.reload();
			} else {
				window.alert("Error");
			}
		};

		return (
			<>
				<div
					className={styles.prevAddressBox}
					style={{
						borderColor:
							(showCheckBox && checked) ||
							(!showCheckBox && isDefault)
								? "rgb(238, 63, 24)"
								: "",
					}}
				>
					{showCheckBox && (
						<input
							type="checkbox"
							value={checked}
							checked={checked}
							onChange={(e) => {
								setSelectedAddress(id);
								setChecked(e.target.checked);
							}}
							style={{ marginRight: "10px", marginTop: "6px" }}
						/>
					)}
					<ul>
						<li>
							<label>Address:</label>
							<p>{address}</p>
						</li>
						<li>
							<label>Postal Code:</label>
							<p>{postalCode}</p>
						</li>
						<li>
							<label>City:</label>
							<p>{city}</p>
						</li>
						<li>
							<label>State:</label>
							<p>{state}</p>
						</li>
						<li>
							<label>Country:</label>
							<p>{country}</p>
						</li>
						<li>
							<label>Phone:</label>
							<p>{phone}</p>
						</li>
					</ul>
					<div style={{ position: "relative" }}>
						<button
							className={styles.moreBtn}
							onClick={() => setMenuActive((prev) => !prev)}
						>
							<div
								className={`${styles.moreMenuBox} ${
									menuActive ? styles.active : ""
								}`}
							>
								<ul>
									<li
										onClick={() => {
											ref.current.classList.add("active");

											setEditAddress({
												address,
												postalCode,
												city,
												state,
												country,
												phone,
												id,
												isEditing: true,
											});
										}}
									>
										Edit
									</li>
									{!isDefault && (
										<li onClick={makeDefault}>
											Make this Default
										</li>
									)}
									<li onClick={deleteAddress}>Delete</li>
								</ul>
							</div>
							<MoreVertOutlinedIcon
								style={{ width: "20px", height: "20px" }}
							/>
						</button>
					</div>
				</div>
			</>
		);
	}
);

AddressItem.displayName = "AddressItem";

export default AddressItem;
