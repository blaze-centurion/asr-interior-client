import styles from "@/styles/Gallery.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { SERVER_URL } from "config/config";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

const GalleryItem = ({ url, slug, pName, basePrice, discountedPrice, id }) => {
	const addToWishlist = async (e) => {
		e.preventDefault();
		const res = await fetch(`${SERVER_URL}/addToWishlist`, {
			method: "PATCH",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ pid: id }),
		});
		if (res.status === 200) {
			toast.success("Item added to your wishlist.");
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
			<div className={styles.product_item}>
				<ToastContainer position="bottom-left" />
				<div className={styles.product_img}>
					<Image
						src={url}
						alt={pName}
						layout="fill"
						objectFit="none"
						quality={100}
						priority={true}
					/>
					<div className={styles.operation_btn_group}>
						<button
							className={styles.addToWishlist}
							onClick={addToWishlist}
						>
							<FavoriteBorderIcon
								style={{ width: "18px", height: "18px" }}
							/>
							<p className={styles.tooltip}>Add to Wishlist</p>
						</button>
						<button
							className={styles.addToCart}
							onClick={addToCart}
						>
							<ShoppingCartOutlinedIcon
								style={{ width: "18px", height: "18px" }}
							/>
							<p className={styles.tooltip}>Add to Cart</p>
						</button>
					</div>
				</div>
				<div className={styles.content}>
					<Link href={`/products/${slug}`}>
						<a className={styles.title}>{pName}</a>
					</Link>
					<div className={styles.price}>
						{discountedPrice === 0 ? (
							<h2 className={styles.discountedPrice}>
								₹{basePrice}
							</h2>
						) : (
							<>
								<h2 className={styles.basePrice}>
									₹{basePrice}
								</h2>
								<h2 className={styles.discountedPrice}>
									₹{discountedPrice}
								</h2>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default GalleryItem;
