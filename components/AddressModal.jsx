import { SERVER_URL } from "config/config";
import { useRouter } from "next/router";
import { useState } from "react";
import validator from "validator";

const AddressModal = () => {
	const [input, setInput] = useState({
		address: "",
		state: "",
		city: "",
		phone: "",
		postalCode: "",
	});
	const router = useRouter();

	const handleInput = (e) => {
		const { name, value } = e.target;
		setInput((prev) => ({ ...prev, [name]: value }));
	};

	const addAddress = async (e) => {
		e.preventDefault();
		if (
			!validator.isMobilePhone(input.phone) ||
			!validator.isPostalCode(input.postalCode)
		) {
			return window.alert("Enter a valid phone number and postal code.");
		}
		const res = await fetch(`${SERVER_URL}/addAddress`, {
			method: "PATCH",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...input,
				isDefault: false,
				country: "India",
				phone: parseInt(input.phone),
				postalCode: parseInt(input.postalCode),
			}),
		});
		if (res.status === 200) {
			router.reload();
		} else {
			window.alert("Something went wrong.");
		}
	};

	return (
		<>
			<form onSubmit={addAddress}>
				<div className="address_form_group">
					<label>Address:</label>
					<textarea
						name="address"
						value={input.address}
						onChange={handleInput}
						style={{ height: "150px" }}
						placeholder="Your address"
					></textarea>
				</div>
				<div className="address_form_group">
					<label>State:</label>
					<input
						type="text"
						name="state"
						value={input.state}
						onChange={handleInput}
						placeholder="Your State"
					/>
				</div>
				<div className="address_form_group">
					<label>City:</label>
					<input
						type="text"
						name="city"
						value={input.city}
						onChange={handleInput}
						placeholder="Your City"
					/>
				</div>
				<div className="address_form_group">
					<label>Postal Code:</label>
					<input
						type="text"
						name="postalCode"
						value={input.postalCode}
						onChange={handleInput}
						placeholder="Your Postal Code"
					/>
				</div>
				<div className="address_form_group">
					<label>Phone No:</label>
					<input
						type="text"
						name="phone"
						value={input.phone}
						onChange={handleInput}
						placeholder="Your Phone Number"
					/>
				</div>
				<div className="address_form_submit_group">
					<input type="submit" value="Add Address" />
				</div>
			</form>

			<style jsx>{`
				@media (max-width: 470px) {
					.address_form_group {
						margin: 18px 0;
					}
					.address_form_group label {
						position: absolute;
						top: -10px;
						left: 10px;
						background: #fff;
					}
					.address_form_group input,
					.address_form_group textarea {
						flex: 1;
						padding: 10px 10px;
					}
				}
			`}</style>
		</>
	);
};

export default AddressModal;
