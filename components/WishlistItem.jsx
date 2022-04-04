import Image from "next/image";
import styles from "@/styles/Wishlist.module.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import Link from "next/link";
import { SERVER_URL } from "config/config";
import { toast, ToastContainer } from "react-toastify";

const WishlistItem = ({ id, src, name, basePrice, discountedPrice, slug }) => {
	const removeFromWishlist = async () => {
		const res = await fetch(`${SERVER_URL}/removeFromWishlist`, {
			method: "PATCH",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ pid: id }),
		});
		if (res.status === 200) {
			toast.success("Removed from your wishlist.");
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
			body: JSON.stringify({ pid: id, qty: 1 }),
		});
		if (res.status === 200) {
			toast.success("Item added to your cart.");
		} else {
			toast.error("Something went wrong. Please try again!");
		}
	};

	return (
		<>
			<div className={styles.product}>
				<div className={styles.imgBox}>
					<Image
						src={src}
						alt={name}
						layout="fill"
						objectFit="none"
						quality={100}
						priority={true}
					/>
				</div>
				<div className={styles.content}>
					<Link href={`/products/${slug}`}>
						<a className={styles.pName}>{name}</a>
					</Link>
					<div className={styles.price_box}>
						<h4 className={styles.basePrice}>{basePrice}</h4>
						<h4 className={styles.discountedPrice}>
							{discountedPrice}9
						</h4>
					</div>
				</div>
				<div className={styles.btnContainer}>
					<button
						className={styles.deleteBtn}
						onClick={removeFromWishlist}
					>
						<DeleteOutlineOutlinedIcon />
					</button>
					<button className={styles.addToCart} onClick={addToCart}>
						<LocalGroceryStoreOutlinedIcon
							style={{
								width: "20px",
								height: "20px",
								marginRight: "7px",
							}}
						/>{" "}
						Add To Cart
					</button>
				</div>
			</div>
		</>
	);
};

export default WishlistItem;
