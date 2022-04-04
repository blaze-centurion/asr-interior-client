import styles from "@/styles/Cart.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

const CartBtnBox = ({
	returnTxt,
	continueTxt,
	boxStyle,
	returnLink,
	continueLink,
	continueValidator,
	hideContinueBtn,
	boxClass
}) => {
	return (
		<div className={`${styles.btn_box} ${boxClass}`} style={boxStyle}>
			<Link href={returnLink}>
				<a>
					<ArrowBackIcon className={styles.arrow_icon} /> {returnTxt}
				</a>
			</Link>
			{hideContinueBtn ? null : (
				<Link href={continueLink}>
					<a className={styles.continue} onClick={continueValidator}>
						{continueTxt}
					</a>
				</Link>
			)}
		</div>
	);
};

export default CartBtnBox;
