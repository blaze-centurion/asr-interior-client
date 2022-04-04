import styles from "@/styles/Cart.module.css";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const CardNavigation = ({ cart, shipping, payment, confirmation }) => {
	return (
		<>
			<ul className={styles.cart_nav_header}>
				<li className={cart}>
					<ShoppingCartOutlinedIcon className={styles.icon} />
					<label>1. My Cart</label>
				</li>
				<li>
					<ArrowForwardIosOutlinedIcon
						className={styles.arrow_icon}
					/>
				</li>
				<li className={shipping}>
					<LocalShippingOutlinedIcon className={styles.icon} />
					<label>2. Shipping info</label>
				</li>
				<li>
					<ArrowForwardIosOutlinedIcon
						className={styles.arrow_icon}
					/>
				</li>
				<li className={payment}>
					<PaymentOutlinedIcon className={styles.icon} />
					<label>3. Payment</label>
				</li>
				<li>
					<ArrowForwardIosOutlinedIcon
						className={styles.arrow_icon}
					/>
				</li>
				<li className={confirmation}>
					<CheckCircleOutlineOutlinedIcon className={styles.icon} />
					<label>4. Confirmation</label>
				</li>
			</ul>
		</>
	);
};

export default CardNavigation;
