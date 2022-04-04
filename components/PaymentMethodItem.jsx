import styles from "@/styles/Cart.module.css";
import Image from "next/image";

const PaymentMethodItem = ({ src, alt, name }) => {
	return (
		<>
			<div className={styles.cart_card_payment_box_item}>
				<Image width="150px" height="90px" layout="intrinsic" src={src} alt={alt} />
				<p>{name}</p>
			</div>
		</>
	);
};

export default PaymentMethodItem;
