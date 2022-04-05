import styles from "@/styles/Product.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
import { Rating } from "react-simple-star-rating";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { SERVER_URL } from "config/config";
import { toast, ToastContainer } from "react-toastify";
import { numberWithCommas } from "./CartProductItem";

import CounterBox from "./CounterBox";
import ModalBox from "./ModalBox";
import MessageModalBox from "./MessageModalBox";

const ProductInfoCard = ({ data }) => {
	const currImgInd = useRef(0);
	const [currAttrInd, setCurrAttrInd] = useState(0);
	const [currImg, setCurrImg] = useState(
		data.variations[currAttrInd].images[0].url
	);
	const [qty, setQty] = useState(1);
	const modalRef = useRef();

	const addToWishlist = async (e) => {
		e.preventDefault();
		const res = await fetch(`${SERVER_URL}/addToWishlist`, {
			method: "PATCH",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ pid: data._id }),
		});
		
		if (res.status === 200) {
			toast.success("Item added to your wishlist.");
		} else if (res.status === 401) {
			toast.error("Please log in to add this item to your wishlist.");
		} else {
			toast.error("Something went wrong. Please try again!");
		}
	};

	const addToCart = async (e) => {
		e.preventDefault();
		const res = await fetch(`${SERVER_URL}/addToCart`, {
			method: "PATCH",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ pid: data._id, qty }),
		});
		if (res.status === 200) {
			toast.success("Item added to your cart.");
		} else if (res.status === 401) {
			toast.error("Please log in to add this item to your cart.");
		} else {
			toast.error("Something went wrong. Please try again!");
		}
	};

	return (
		<>
			<ModalBox
				ref={modalRef}
				headerTitle="Any query about this product"
				modalInnerStyle={{
					width: "35vw",
					height: "auto",
					minHeight: "30vh",
				}}
			>
				<MessageModalBox ref={modalRef} />
			</ModalBox>
			<ToastContainer position="bottom-left" />
			<div
				className={`${styles.product_card} ${styles.product_info_card}`}
			>
				<div className={styles.product_images_box}>
					<ul className={styles.more_imgBox}>
						{data.variations[currAttrInd].images.map((img, ind) => {
							return (
								<li
									className={
										ind === currImgInd.current
											? styles.active
											: "non-active"
									}
									key={ind}
									onClick={() => {
										currImgInd.current = ind;
										setCurrImg(img.url);
									}}
								>
									<Image
										src={img.url}
										layout="fill"
										alt={`${data.productName} ${ind}`}
										placeholder="blur"
										blurDataURL="/image-blur-placeholder.png"
									/>
								</li>
							);
						})}
					</ul>
					<div className={styles.mainImg}>
						<Image
							src={currImg}
							layout="fill"
							priority={true}
							alt={data.productName}
						/>
					</div>
				</div>
				<div className={styles.content_container}>
					<div className={styles.row}>
						<h1 className={styles.title}>{data.productName}</h1>
						<div
							style={{
								display: "flex",
								alignItems: "flex-start",
								padding: "5px 0",
							}}
						>
							<Rating
								size={20}
								readonly
								initialValue={data.rating}
								allowHalfIcon
							/>
							<p
								style={{
									fontSize: "13px",
									color: "#808080",
									marginTop: "0.3px",
									marginLeft: "2px",
								}}
							>
								({data.reviews.length} reviews)
							</p>
						</div>
					</div>
					<div
						className={styles.row}
						style={{
							display: "flex",
							alignItems: "center",
							paddingTop: "10px",
						}}
					>
						<div className={styles.soldby_box}>
							<p className={styles.soldByText}>Sold By:</p>
							<p>ASR Interiors</p>
						</div>
						<button
							className={styles.msgBtn}
							onClick={() =>
								modalRef.current.classList.add("active")
							}
						>
							Message Us
						</button>
					</div>
					<div className={styles.row}>
						{data.discountedPrice === 0 ? (
							<div
								className={`${styles.flex_item_group} ${styles.price_group}`}
							>
								<label>Price:</label>
								<h3>₹{numberWithCommas(data.basePrice)}</h3>
							</div>
						) : (
							<>
								<div
									className={`${styles.flex_item_group} ${styles.price_group}`}
								>
									<label>Price:</label>
									<h3 className={styles.basePrice}>
										₹{numberWithCommas(data.basePrice)}
									</h3>
								</div>
								<div
									className={`${styles.flex_item_group} ${styles.price_group}`}
								>
									<label>Discount Price:</label>
									<h3>
										₹
										{numberWithCommas(data.discountedPrice)}
									</h3>
								</div>
							</>
						)}
					</div>
					<div className={styles.row}>
						<div className={styles.flex_item_group}>
							<label>Color:</label>
							<ul>
								{data.variations.map((variation, ind) => {
									return (
										<li
											key={ind}
											data-color={variation.value}
											className={
												currAttrInd === ind
													? styles.active
													: "non-active"
											}
											onClick={() => {
												setCurrAttrInd(ind);
												setCurrImg(
													data.variations[ind]
														.images[0].url
												);
												currImgInd.current = 0;
											}}
											style={{
												background: variation.value,
											}}
										></li>
									);
								})}
							</ul>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.flex_item_group}>
							<label>Quantity:</label>
							<CounterBox
								qty={qty}
								setQty={setQty}
								stock={data.stock}
							/>
							{data.showStock ? (
								<p
									style={{
										marginLeft: "10px",
										opacity: "0.6",
										fontSize: "15px",
									}}
								>
									({data.stock} available)
								</p>
							) : null}
						</div>
					</div>

					<div className={styles.row}>
						<div
							className={`${styles.flex_item_group} ${styles.price_group}`}
						>
							<label>Total Price:</label>
							<h3 className={styles.totalPrice}>
								₹
								{data.discountedPrice
									? numberWithCommas(data.discountedPrice)
									: numberWithCommas(data.basePrice)}
							</h3>
						</div>
					</div>
					<div
						className={styles.row}
						style={{
							border: "none",
							display: "flex",
							alignItems: "center",
						}}
					>
						<button
							className={`${styles.operBtn} ${styles.cartBtn}`}
							onClick={addToCart}
						>
							<ShoppingBagOutlinedIcon
								style={{
									width: "15px",
									height: "15px",
									marginRight: "5px",
								}}
							/>{" "}
							Add To Cart
						</button>
						<button
							className={`${styles.operBtn} ${styles.buyNowBtn}`}
						>
							<LocalGroceryStoreOutlinedIcon
								style={{
									width: "15px",
									height: "15px",
									marginRight: "5px",
								}}
							/>{" "}
							Buy Now
						</button>
					</div>
					<div
						className={styles.row}
						style={{
							border: "none",
							display: "flex",
							alignItems: "center",
						}}
					>
						<button
							className={`${styles.operBtn} ${styles.wishlistBtn}`}
							onClick={addToWishlist}
						>
							Add To Wishlist
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductInfoCard;
