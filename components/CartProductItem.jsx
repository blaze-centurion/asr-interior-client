import Image from "next/image";
import Link from "next/link";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { SERVER_URL } from "config/config";
import { useEffect, useState } from "react";
import CounterBox from "./CounterBox";
import { useRouter } from "next/router";
import axios from "axios";
import { numberWithCommas } from "utils/utils";

const CartProductItem = ({
	pName,
	src,
	qty,
	price,
	total,
	discount,
	alt,
	slug,
	setTotalPrice,
	setProducts,
	setIsEmpty,
	productsLen,
	pid,
	stock,
}) => {
	const [inputQty, setInputQty] = useState(qty);

	useEffect(() => {
		setTotalPrice((prev) => {
			return prev + total * qty;
		});
	}, [setTotalPrice, qty, total]);

	useEffect(() => {
		if (inputQty === qty) return;
		async function changeProductQty() {
			await axios.patch(
				`${SERVER_URL}/updateCartItemQty`,
				{
					pid,
					qty: inputQty,
				},
				{ withCredentials: true }
			);
		}
		changeProductQty();
	}, [inputQty, pid, qty]);

	const removeFromWishlist = async () => {
		const res = await fetch(`${SERVER_URL}/removeFromCart`, {
			method: "PATCH",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ pid }),
		});
		if (res.status === 200) {
			setProducts((prev) => {
				return prev.filter((val) => val._id !== pid);
			});
			setTotalPrice((prev) => prev - total * qty);
			if (productsLen - 1 === 0) setIsEmpty(true);
		} else {
			window.alert("Something went wrong.");
		}
	};

	return (
		<>
			<tr>
				<td
					data-label="#"
					className="imgBx"
					style={{
						minWidth: "53px",
						minHeight: "53px",
					}}
				>
					<Image src={src} alt={alt} layout="fill" />
				</td>
				<td data-label="Product">
					<Link href={`/products/${slug}`}>
						<a>{pName}</a>
					</Link>
				</td>
				<td data-label="Price">₹{numberWithCommas(price)}</td>
				<td data-label="Discount" className="discount">
					- ₹{numberWithCommas(discount)}
				</td>
				<td data-label="Quantity">
					{" "}
					<CounterBox
						setTotalPrice={setTotalPrice}
						price={total}
						qty={inputQty}
						setQty={setInputQty}
						stock={stock}
					/>
				</td>
				<td data-label="Total" className="total">
					₹{numberWithCommas(total * inputQty)}
				</td>
				<td data-label="Remove" className="options">
					<button className="deleteBtn" onClick={removeFromWishlist}>
						<DeleteOutlinedIcon className="icon" />
					</button>
				</td>
			</tr>
		</>
	);
};

export default CartProductItem;
